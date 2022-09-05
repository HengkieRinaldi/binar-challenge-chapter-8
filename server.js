const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const bodyparser = require('body-parser')
const koneksiDB = require('./config/connection')
const socketio = require('socket.io')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const swaggerJSON = require('./swagger.json')
const swaggerUI = require('swagger-ui-express')

//midleware
dotenv.config({ path : './config/config.env'})
const PORT = process.env.PORT
app.use(morgan('dev'))

app.use(cors())
koneksiDB()
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
// views engine
app.set("view engine","ejs")
app.use('/css',express.static(path.resolve(__dirname, "public/css")))
app.use('/js',express.static(path.resolve(__dirname, "public/js")))
app.use('/assets',express.static(path.resolve(__dirname, "public/assets")))
app.use('/main',express.static(path.resolve(__dirname, "public/main")))
app.use('/game',express.static(path.resolve(__dirname, "public/game")))
app.use('/img',express.static(path.resolve(__dirname, "public/img")))

const {userConnected, connectedUsers, initializeChoices, moves, makeMove, choices} = require("./helpers/users")
const {createRoom, joinRoom, exitRoom, rooms} = require("./helpers/rooms")

app.use('/', require('./routes/router'))
app.use('/documentation/api', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
let expressServer = app.listen(PORT, ()=> {console.log(`server running on http://localhost:${PORT}`)})

// io server
const io = socketio(expressServer, {
    path: '/socket.io',
    serveClient : true
})

io.on("connection", socket => {
    socket.on("create-room", (roomId) => {
        if(rooms[roomId]){
            const error = "ruangan sudah penuh...";
            socket.emit("display-error", error);
        }else{
            userConnected(socket.client.id);
            createRoom(roomId, socket.client.id);
            socket.emit("room-created", roomId);
            socket.emit("player-1-connected");
            socket.join(roomId);
        }
    })

    socket.on("join-room", roomId => {
        if(!rooms[roomId]){
            const error = "ruangan sudah tidak ada...";
            socket.emit("display-error", error);
        }else{
            userConnected(socket.client.id);
            joinRoom(roomId, socket.client.id);
            socket.join(roomId);

            socket.emit("room-joined", roomId);
            socket.emit("player-2-connected");
            socket.broadcast.to(roomId).emit("player-2-connected");
            initializeChoices(roomId);
        }
    })

    socket.on("join-random", () => {
        let roomId = "";

        for(let id in rooms){
            if(rooms[id][1] === ""){
                roomId = id;
                break;
            }
        }

        if(roomId === ""){
            const error = "ruangan sudah penuh atau tidak ada...";
            socket.emit("display-error", error);
        }else{
            userConnected(socket.client.id);
            joinRoom(roomId, socket.client.id);
            socket.join(roomId);

            socket.emit("room-joined", roomId);
            socket.emit("player-2-connected");
            socket.broadcast.to(roomId).emit("player-2-connected");
            initializeChoices(roomId);
        }
    });

    socket.on("make-move", ({playerId, myChoice, roomId}) => {
        makeMove(roomId, playerId, myChoice);

        if(choices[roomId][0] !== "" && choices[roomId][1] !== ""){
            let playerOneChoice = choices[roomId][0];
            let playerTwoChoice = choices[roomId][1];

            if(playerOneChoice === playerTwoChoice){
                let message = "player 1 dan player 2 membuat pilihan yang sama " + playerOneChoice + " . Hasilnya adalah : DRAW....";
                io.to(roomId).emit("draw", message);
                
            }else if(moves[playerOneChoice] === playerTwoChoice){
                let enemyChoice = "";

                if(playerId === 1){
                    enemyChoice = playerTwoChoice;
                }else{
                    enemyChoice = playerOneChoice;
                }

                io.to(roomId).emit("player-1-wins", {myChoice, enemyChoice});
            }else{
                let enemyChoice = "";

                if(playerId === 1){
                    enemyChoice = playerTwoChoice;
                }else{
                    enemyChoice = playerOneChoice;
                }

                io.to(roomId).emit("player-2-wins", {myChoice, enemyChoice});
            }

            choices[roomId] = ["", ""];
        }
    });

    socket.on("disconnect", () => {
        if(connectedUsers[socket.client.id]){
            let player;
            let roomId;

            for(let id in rooms){
                if(rooms[id][0] === socket.client.id || 
                    rooms[id][1] === socket.client.id){
                    if(rooms[id][0] === socket.client.id){
                        player = 1;
                    }else{
                        player = 2;
                    }

                    roomId = id;
                    break;
                }
            }

            exitRoom(roomId, player);

            if(player === 1){
                io.to(roomId).emit("player-1-disconnected");
            }else{
                io.to(roomId).emit("player-2-disconnected");
            }
        }
    })
})
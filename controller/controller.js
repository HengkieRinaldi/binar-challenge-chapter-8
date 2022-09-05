const user = require('../model/user')
const profile = require('../model/profile')
const history = require('../model/history')
const totalScore = require('../model/totalScore')
const Cryptr = require('cryptr')
const cryptrConverter = new Cryptr(process.env.SECRET_KEY)
const jwt = require('jsonwebtoken')

//find id
exports.findById = async (req,res) =>{
    try {
        const findUser = await user.findById(req.params.id)
        res.json(findUser)
    } catch (err) {
        console.log(err)
    }
}
//register
exports.register = async (req, res) => {
    let { username, password, email } = req.body
    console.log(req.body)
    if (!username || !password || !email) {
        res.status(400).send({
            message: "kesalahan data"
        })

    } else {
        try {
            // check data drom database 
            let userCheck = await user.findOne({ username: username, email: email })
            if (userCheck) {
                res.status(400).send({
                    message: "username or email has registered"
                })
            } else {
                // encryp password 
                let newPassword = cryptrConverter.encrypt(password)
                // create user
                let createUser = await user.create({
                    username: username, password: newPassword, email: email
                })
                // create profile
                let createProfile = await profile.create({
                    user_id: createUser._id,
                    username: createUser.username,
                    fullName: '',
                    firstName: '',
                    lastName: '',
                    umur: 0,
                    tglLahir: '',
                    gender: '',
                    address: ''
                })
            }
            // send new data 
            console.log({
                message: "sukses create data",
                statusCode: 200
            })
            res.send({
                status:200,
                message: "success createdata",
            })
        } catch (err) {
            console.log(err)
        }
    }
}
// login
exports.login = async (req, res) => {
    let { username, password } = req.body

    if (!username || !password) {
        res.status(400).send({
            message: "username or password wrong."
        })
    } else {
        try {
            // check username
            let findUser = await user.findOne({ username: username })
            if (!findUser || findUser.length < 0) {
                res.status(400).send({
                    message: "username or password wrong.."
                })
            } else {
                //decrypt password
                let decryptPassword = cryptrConverter.decrypt(findUser.password)
                // cek password
                if (decryptPassword == password) {
                    // jwt
                    let token = jwt.sign({
                        id: findUser._id,
                        type:findUser.type
                    }, process.env.SECRET_KEY)

                    // get profile
                    let getProfile = await profile.findOne({user_id: findUser._id})
                    console.log({
                        message: 'success to login',
                        statusCode:200,
                        result: {
                            id: findUser._id,
                            username: findUser.username,
                            email: findUser.email,
                            token: token,
                            Profile: getProfile
                    }})
                    res.cookie("token", token)
                    res.redirect('/multiplayer')
                } else {
                    res.status(400).send({ message: "username or password wrong..." })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}
// get user
exports.findUser = async (req, res) => {
    if(req.query.id) {
        const id = req.query.id
        let findId = await user.findById(id)
        try {
            if(!findId) {
                res.status(400).send({ message: "data not found"})
            } else {
                res.send(findId)
            }
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            let getUser = await user.find()
            res.send(getUser)
        } catch (err) {
            res.status(500).send({message: err.message})
        }
    }
}
//get profile
exports.findProfile = async (req,res) => {
    if (req.query.username) {
        const username = req.query.username

        try {
            let findUsername = await profile.findOne(username)
            if (findUsername){
                res.send(findUsername)
            } else {
                let getProfile = await profile.find()
                res.send(getProfile)
            }
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
}
exports.updateUser = async (req, res) => {
    // inisialisasi
    if (!req.body) {
        return res.status(400).send({ message: "data tidak boleh kosong" })
    }

    const id = req.params.id
    user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `tidak dapat  mengupdate user dengan id : ${id}. mungkin user tidak ada!` })
            } else {
                res.status(200).send({
                    message: "berhasil update data",
                    data: data
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "error mengupdate data user" })
        })
}
//detail
exports.detailProfile = async (req,res) => {
    if (!req.body) {
        return res.status(400).send({ message: "data tidak boleh kosong" })
    }
    const id = req.params.id
    profile.findOneAndUpdate({id: id}, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `tidak dapat  mengupdate user dengan id : ${id}. mungkin user tidak ada!` })
            } else {
                res.status(200).send({
                    message: "berhasil update data",
                    data: data
                })
            }
        })
        .catch (err =>{
            res.send(err)
        })
}
// delete
exports.deleteUser = async (req,res) => {
    let id = req.params.id
    try {
        let data = await user.findByIdAndDelete(id)
        if(!data) {
            res.status(404).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`})
        } else{
            res.send({message: "User was deleted successfully!"})
        }
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
}
// history
exports.gameScore = async (req,res) => {
    let {user_id, win, draw, lose} = req.body
    let newDataHistory = {
        user_id: user_id, win: win,
        draw: draw, lose: lose, waktu : Date.now()
    }
    try {
        let findTotalScore = await totalScore.findOne({user_id: user_id})
        let createHistory = await history.create(newDataHistory)
        if (!findTotalScore) {
            let createTotalScore = await totalScore.create(newDataHistory)
            res.send("data total score created...")
        } else {
            findTotalScore.win = parseInt(findTotalScore.win) + parseInt(win)
            findTotalScore.draw = parseInt(findTotalScore.draw) + parseInt(draw)
            findTotalScore.lose = parseInt(findTotalScore.lose) + parseInt(lose)
            console.log(findTotalScore)
            let updateTotalScore = totalScore.findByIdAndUpdate(
                {user_id:user_id}, findTotalScore
                )
            res.send('update success...')
            }

    } catch (err) {
        console.log(err)
        res.status(500).send({message:"failed to save history"})
    }
}
// show score
exports.gameRead = async (req,res) => {
    let id = req.params.id
    try {
        let getScore = await totalScore.aggregate([
            {
                $lookup: {
                    from: 'histories',
                    localField: 'user_id',
                    foreignField:'user_id',
                    as:'score_history'
                }
            }
        ])
        res.send({
            message:"success",
            result: getScore
        })
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
}
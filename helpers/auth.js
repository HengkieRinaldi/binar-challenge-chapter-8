const jwt = require('jsonwebtoken')
const path = require('path')
const dotenv = require('dotenv')
const { decode } = require('punycode')
dotenv.config({path : '../config/config.env'})

const verifyJWT = async (req, res, next) => {
    try {
        const cookie = req.cookies["token"]
        const getAccess = jwt.verify(cookie, process.env.SECRET_KEY)
        if (!getAccess) {
            res.status(401).send({message: "token invalid...."})
        }
        next()   
    } catch (err) {
        return res.status(401).send({
            message: "access denied... login first"
        })
    }    
}

const verifyAdmin = async (req, res, next) => {
    try {
        const cookie = req.cookies["token"]
        const getAccess = jwt.verify(cookie, process.env.SECRET_KEY,
            (err,decoded) =>{
                if(err) return res.status(403).send({message: "no token... login first..."})
                req.type = decoded.type
            })
        if (!getAccess) {
            res.status(401)
        }
        if(req.type !== "admin") return res.status(403).send({message: "admin only..."})
        next()   
    } catch (err) {
        console.log(err)
    }    
}
module.exports = {verifyJWT, verifyAdmin}
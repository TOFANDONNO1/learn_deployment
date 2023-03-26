const express = require('express');
const { UserModel } = require('../model/user.model');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
//registration
userRouter.post("/register", async (req, res) => {
    const { email, pass, location, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {

            const user = new UserModel({ email, pass: hash, location, age })
            await user.save()
            res.status(200).send({ "msg": "Registration has been Done!" });

        });

    } catch (error) {
        res.status(400).send({ "msg": "Registration error: " })
    }
    
})

//login
userRouter.post("/login", async (req, res) => {
  const {email,pass}=req.body
    try {

        const user = await UserModel.findOne({ email, pass })
        // user.length > 0 ? res.status(200).send({ "msg": "Registration Successfully", "token": jwt.sign({ name: "batman" }, "bruce") }) : res.status(400).send({ "msg": "Registration error: " })
if(user){
    bcrypt.compare(pass,user.pass,(err,result)=>{
if(result){
    res.status(200).send( {"msg": "Registration Successfully","token": jwt.sign({ "userID": user._id},"masai")})
}
else{
    res.status(400).send({ "msg": "Registration error: " })

}

    })
}



    } catch (error) {
        res.status(400).send({ "msg": "Registration error: " })
    }

});


userRouter.get("/details", (req, res) => {
    const { token } = req.query
    jwt.verify(token, "bruce", (err, decoded) => {
        decoded ? res.status(200).send("User Details") : res.status(400).send({ "msg": "Login Required cannot access the restricted route: " })
    })
    // token ? res.status(200).send({ "msg": "User Details" }) : res.status(400).send({ "msg": "Login Required cannot access the restricted route: " })

})

userRouter.get("/moviedata", (req, res) => {
    const { token } = req.query
    jwt.verify(token, "bruce", (err, decoded) => {
        decoded ? res.status(200).send("Movie Details") : res.status(400).send({ "msg": "Login Required cannot access the restricted route: " })
    })
    // token ? res.status(200).send({ "msg": "Movie Details" }) : res.status(400).send({ "msg": "Login Required cannot access the restricted route: " })

})
module.exports = {
    userRouter
}
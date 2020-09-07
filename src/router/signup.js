const route = require("express").Router();
const path = require("path");

const User = require("../models/user");

route.get('/',(req,res)=>{
    return res.sendFile(path.resolve("public/html/signup.html"));
})

route.post('/',(req,res)=>{
    // console.log(req.body);
    User.findOne({
        email:req.body.email,
        username: req.body.username
    }).exec((err,user)=>{
        if(err){
            console.log(err);
            return res.send(undefined);
        }
        if(user){
            // console.log("User exisits");
            return res.send("User already exisits");
        }

        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = newUser.encryptPassword(req.body.password);
        User.create(newUser,(err,user)=>{
            if(err){
                console.log("unknow err while signup ",err);
                res.send(undefined);
            }
            else if(!user){
                console.log("user not defined !");
                res.send(undefined);
            }
            else{
                console.log("new user created successfully");
                res.send("success");
            }
        })

    })
})

module.exports = route;
const route = require("express").Router();
const path = require("path");
const User = require("../models/user");
const Post = require("../models/post");

route.get('/details',loggedIn,(req,res)=>{
    User.findOne({
    username: req.user.username        
    },(err,user)=>{
        if(err){
            console.log("err in finding user");
            res.send(undefined);
        }
        else if(!user){
            console.log("user not found ");
            res.send(undefined);
        }
        else{
            // console.log("user details",user);
            res.send(user);
        }
    })
})

route.post('/newPost',loggedIn,(req,res)=>{
    // console.log(req.user.posts);
    Post.create({
        userId: req.user._id,
        user: req.user.username,
        title: "Random Post",
        body: req.body.message,
    },(err,post)=>{
        if(err){
            console.log("err post not added!");
            return res.send(undefined);
        }
        
        // console.log(post);
        return res.send("success");
    })
})


function loggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
    }
}

module.exports = route;
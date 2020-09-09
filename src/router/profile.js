const route = require("express").Router();
const path = require("path");
const User = require("../models/user");
const Post = require("../models/post");
const mongoose = require("mongoose");

route.get('/:username',loggedIn,(req,res)=>{
    // console.log(req.params);
    var data = {
        user: undefined,
        post:undefined,
        self:undefined,
    };
    User.findOne({
        username: req.params.username        
        },(err,user)=>{
            if(err){
                console.log("err in finding user",err);
                return res.render(("error.html"),{err:"some err in finding user !"});
            }
            else if(!user){
                console.log("user not found ");
                return res.render(("error.html"),{err:"user do not exists !"});
            }
            else{
                // if(req.params.username.trim() == req.user.username.trim()){
                    data.self = req.user;
                // }
                data.user = user;

                Post.find({userId:user._id}).sort({updatedAt: 'desc'})
                .exec((err,post)=>{
                    if(err){
                        console.log("error while getting post");
                        return res.send(undefined);
                    }
                    else{
                        data.post = post;
                        return res.render(("profile.html"),{userData:data});
                    }
                })
            }
        })
})

route.delete('/post',loggedIn,(req,res)=>{
    Post.deleteOne({_id:req.body.id})
    .exec((err,post)=>{
        if(err)
        return res.send(undefined);

        if(post){
        return res.send("success");
        }
    })
})

route.post('/follow',loggedIn,(req,res)=>{
    console.log(req.body); // jisko follow kia hai
    console.log(req.user); // jisne follow kia hai / jo loggedin hai
    let newDetails = {
        follwerId: mongoose.Types.ObjectId(req.body._id),
        username: req.body.username,
    }

    User.findOneAndUpdate({
        username: req.user.username,
    },{
        $addToSet:{
            followings:newDetails,
        }
    },{
        new:true,
    }).exec((err,user)=>{

        if(err){
            console.log("err in following user",err);
            return res.render(("error.html"),{err:"err while following user !"});
        }
        if(user){
            // console.log("following success:",user);
            User.findOneAndUpdate({
                username: req.body.username,
            },{
                $addToSet:{
                    followers:{
                        follwerId: mongoose.Types.ObjectId(req.user._id),
                        username: req.user.username,
                    }
                }
            },{
                new:true,
            }).exec((err,user)=>{
                if(err){
                    console.log("err while adding followers in user",err);
                    return res.render(("error.html"),{err:"rror while adding followers in user"});
                }
                if(user){
                    // console.log("follow success",user);
                    return res.send("success");
                }
            })
        }
        else{
            res.send("error");
        }
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
const route = require("express").Router();
const path = require("path");
const User = require("../models/user");
const Post = require("../models/post");

route.get('/:username',loggedIn,(req,res)=>{
    // console.log(req.params);
    console.log(req.user);
    var data = {
        user: undefined,
        post:undefined,
        self:false
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
                console.log("1:",req.params.username.trim());
                console.log("2:",req.user.username.trim())
                if(req.params.username.trim() == req.user.username.trim()){
                    data.self = true;
                }
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



function loggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
    }
}

module.exports = route;
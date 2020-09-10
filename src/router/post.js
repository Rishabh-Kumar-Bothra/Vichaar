const route = require("express").Router();

const User = require("../models/user");
const Post = require("../models/post");


route.get("/all",loggedIn,(req,res)=>{
    Post.find({}).sort({updatedAt: 'desc'})
    .exec((err,posts)=>{
        if(err){
            console.log("err while loading all posts!");
            return res.send(undefined);
        }
        if(!posts){
            console.log("no post found!");
            return res.send(undefined);
        }
        // console.log(posts);
        return res.send(posts);
    })
})

route.get("/followings",loggedIn,(req,res)=>{
    User.aggregate([
        { "$match": { "username": req.user.username }},
        {
            $lookup:{
                from :"Post",
                localField: "followings",
                foreignField: "username",
                as: "Posts_of_following"
            }
        }
    ]).exec((err,posts)=>{
        if(err){
            console.log("follow post err",err);
            return res.render(("error.html",{err:"Error while loading your followers post please login again"}));
        }
        if(posts){
            console.log("posts",posts);
            return res.send(posts);
        }
        res.render(("error.html"),{err:"No posts exists"});

    })
})

route.post("/likes",loggedIn,(req,res)=>{
    Post.findOneAndUpdate({
        _id: req.body.id,
    },{
        $inc:{
            likes:1,
        }
    },{new:true})
    .exec((err,post)=>{
        if(err){
            console.log("err while inc likes");
            return res.send(undefined);
        }
        if(post){
            console.log("updated!");
            return res.send("success");
        }

        return res.send(undefined);
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
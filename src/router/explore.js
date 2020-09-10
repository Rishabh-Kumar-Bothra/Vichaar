const route = require("express").Router();
const path = require("path");


route.get('/',loggedIn,(req,res)=>{
    // console.log("get explore req")
    return res.sendFile(path.resolve("public/html/explore.html"));
})

route.get('/home',loggedIn,(req,res)=>{
    console.log("home loaded by route");
    return res.sendFile(path.resolve("public/html/explore.html"));
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
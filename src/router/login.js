const route = require("express").Router();
const path = require("path");
const passport = require('../passport');


route.get('/',loggedIn,(req,res)=>{
    // console.log("login req")
    return res.sendFile(path.resolve("public/html/login.html"));
})

route.post('/',passport.authenticate('local',{
    failureRedirect: '/login/failure',
    successRedirect: '/login/success'
}))

route.get('/failure',(req,res)=>{
    console.log('Failed to Login');
    console.log(res.message);
    res.send("Failed to Login");
})

route.get('/success',(req,res)=>{
    console.log('Login Successful');
    console.log(res.message);
    res.send("success");
})

route.get('/logout',(req, res)=>{
    req.logOut();
    console.log("Logged Out Succefully");
    res.send(undefined);
})

function loggedIn(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    else{
        return next();
    }
}



module.exports = route;
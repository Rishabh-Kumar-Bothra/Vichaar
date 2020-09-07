const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const env = require("dotenv").config();
const passport = require("./passport");
const express_session = require("express-session");
const mongoose  = require("mongoose");

const login = require("./router/login");
const signup = require("./router/signup");
const explore = require("./router/explore");

const PORT = process.env.PORT || 3000;
const mongo_uri = process.env.mongo_uri;

mongoose.connect(mongo_uri,{ useUnifiedTopology: true, useNewUrlParser: true })
    .then(()=>{
        console.log("db connection successfull !");
        app.listen(PORT, ()=>{
            console.log("server started on port number: ",PORT);
        })
    })
    .catch((err)=>{
        console.log("error : ",err);
    })


app.use(express.static(path.join(__dirname , 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: true, credentials: true }));

app.use(express_session({
    secret: process.env.express_session_secret,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/login",login);
app.use("/signup",signup);
app.use("/",explore);




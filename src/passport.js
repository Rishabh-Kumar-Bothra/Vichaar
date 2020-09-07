const passport = require("passport");
const LocalStatergy = require("passport-local").Strategy;

const User = require("./models/user");

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    User.findOne({
      username: username
    }).exec((err, user) =>{
      if(err || !user){
        return done(err || new Error("user do not exists"));
      }
      return done(null, user);
    })
  });

passport.use(new LocalStatergy((username,password,done)=>{
    // console.log("user: ",username," password: ",password);

    User.findOne({ username:username },(err,user)=>{
        if(err)
            return done(err);

        if(!user)
            return done(null,false,{message: "incorrect email or user do not exists"});

        if(!user.comparePassword(password))
            return done(null, false, { message: 'Incorrect password.' });
        
        return done(null,user);
    })

}))

module.exports = passport;
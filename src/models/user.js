const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    dimage:{
        type:String,
        default:'https://picsum.photos/50/50',
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }],
    followers:[{
        followerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:{
            type:String,
            default:'',
            trim:true,
            unique:true,
        }
    }],
    followings:[{
        followingId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:{
            type: String,
            default: '',
            trim:true,
            unique: true,
        }
    }]
})

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,10) // here 10 is salt rounds
}

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

const User = mongoose.model("User",UserSchema);
module.exports = User;
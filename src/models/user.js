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
            default:''
        }
    }],
    followings:[{
        followingId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:{
            type: String,
            default: ''
        }
    }]
})

UserSchema.methods.hashPassowrd = function(password){
    return bcrypt.hashSync(password,bcrypt.genSalt(10),null);
}

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

const User = mongoose.model("User",UserSchema);
module.exports = User;
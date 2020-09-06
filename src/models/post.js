const mongoose = require("mongoose");

const PostSceham = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        require:true,
    },
    likes:{
        type:Number,
        default: 0
    },
    image:{
        type:String,
    },
    comments:[{
        body:{
            type:String,
        },
        likes:{
            type:Number
        },
        user:{
            type:String,
        },
        replies:[{
            body:{
                type:String,
            },
            likes:{
                type:Number,
                default: 0
            },
            user:{
                type:String,
            },
        }]
    }]
})

const Post = mongoose.Schema.model("Post",PostSceham);
module.exports = Post;
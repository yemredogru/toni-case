const mongoose = require('mongoose');

const schema = mongoose.Schema({
    image:{
        type:String
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }
    
})

const Post = mongoose.model('Post',schema);
module.exports = Post
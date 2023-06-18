const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const schema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phone_number:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    posts:{
        type:Array,
        post_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        },
        default:[]
    }
    ,
    refresh_token:{
        type:String,

    },
    password:{
        type:String
    },
    profile_picture:{
        type:String
    },
    friends:{
        type:Array,
        friend_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        default:[]
    },
    pending_requests:{
        type:Array,
        request_user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        default:[]
    }
    
})
schema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
const User = mongoose.model('User',schema);
module.exports = User
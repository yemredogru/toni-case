const userService = require('../../services/userService');

const Register = async(req,res,next)=>{
    const {name,email,password } = req.body;
    const new_user = new userService.User(name,email,password)
    new_user.createUser()
    .then()
}
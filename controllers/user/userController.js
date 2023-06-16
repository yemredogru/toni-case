const userService = require('../../services/userService');
const authService = require('../../services/authService');
const userModel = require('../../models/userModel')


const Register = async(req,res,next)=>{
    const {name,email,password } = req.body;
    const new_user = new userService.User(name,email,password)
    new_user.createUser()
    .then(data=>{
        res.status(201).json({status:false})
    })
    .catch(err=>{
        res.status(404).json({status:false})
    })
}
const Login =async(req,res,next)=>{
        try {
          // Extract email and password from the req.body object
          const {email,password } = req.body
          const auth_status = new authService.Auth(email,password)
          auth_status.Login()
          .then(data=>{
            res.status(200).json({token:data})
          })
          .catch(err=>{
            res.status(403).json({err:err})
          })
          
        } catch (error) {
          res.status(401).send(err.message);
        }
}
const UserById = async(req,res,next)=>{
    try{
        const user = new userService.User(id=req.params.id)
        user.findById()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(404).json(err)
        })
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const AllUsers = async(req,res,next)=>{
    try{
        const users = userModel.find()
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

module.exports={Register,Login,UserById,AllUsers}
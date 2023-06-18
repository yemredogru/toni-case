const userService = require('../../services/userService');
const authService = require('../../services/authService');
const userModel = require('../../models/userModel')
const UploadS3 = require('../../helpers/customUpload')
const Sns = require('../../helpers/subscribeSns')



const Register = async(req,res,next)=>{
    const {firstName,lastName,phone_number,email,password } = req.body;
    if(firstName != undefined && lastName != undefined &&phone_number != undefined && email!= undefined && password!= undefined)
    {
        const new_user = new userService.User(firstName,lastName,phone_number,email,password)
    new_user.createUser()
    .then(data=>{
        if(req.files){
            UploadS3.uploadAws(req.files)
            .then(async(response)=>{
                try{
                    var user = await userModel.findOne({_id:data._id})
                    if(!user){
                        res.status(400).json({message:"User Not Found!"})
                    }
                    else{
                        user.profile_picture = response.Location;
                        await user.save()
                        await Sns.SubscribeSns(email)
                        res.status(201).json({message:"User created successfully"})
                    }
                }
                catch(err){
                    res.status(500).json({err:err})
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(404).json({err:err})
            })
        }
        else{
            res.status(200).json({message:"User created successfully"})
        }
        
        
    })
    .catch(err=>{
        res.status(404).json({err:err})
    })
    }
    else{
        res.status(404).json({err:"All fields are required"})
    }
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
        const users = await userModel.find().select('-password')
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const sendRequest = async(req,res,next)=>{
    try{
        const service = new userService.User()
        service.friendRequest(req.user.user.id,req.params.id)
        .then(data=>{
            
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({message:err})
        })
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const AcceptRequest = async(req,res,next)=>{
    try{
        const service = new userService.User()
        service.acceptRequest(req.user.user.id,req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message:err})
        })
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const RejectRequest = async(req,res,next)=>{
    try{
        const service = new userService.User()
        service.rejectRequest(req.user.user.id,req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({message:err})
        })
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

module.exports={Register,Login,UserById,AllUsers,sendRequest,AcceptRequest,RejectRequest}
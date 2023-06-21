const userModel = require('../models/userModel')

async function verifyRequest(req,res,next){
    const user = await userModel.findOne({_id:req.params.id})
    if(!user){
        return res.status(401).json({message:'User not found'})
    }
    else{
        const is_request = await userModel.findOne({_id:req.user.user.id,"pending_requests.request_user_id":req.params.id})
        if(!is_request){
            return res.status(401).json({message:'No request'})
        }
        else{
            next()
        }
    }
}
async function ifRequest(req,res,next){
    const user = await userModel.findOne({_id:req.params.id})
    if(!user){
        return res.status(401).json({message:'User not found'})
    }
    else{
        const is_request = await userModel.findOne({_id:req.user.user.id,"pending_requests.request_user_id":req.params.id}) 
        const is_friend = await userModel.findOne({_id:req.user.user.id,"friends.friend_id":req.params.id}) 
        if(!is_request && !is_friend){
            next()
        }
        else{
            if(is_request){
                return res.status(401).json({message:'Friend request already sent'})
            }
            else{
                return res.status(401).json({message:'Already friend'})
            }
        }
    }
}
module.exports={verifyRequest,ifRequest}
const profileService = require('../../services/profileService');
const postModel = require('../../models/postModel')

const PostById = async(req,res,next)=>{
    try{
        const post = new profileService.Post(id=req.params.id)
        post.getPostById()
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
const AllPosts = async(req,res,next)=>{
    try{
        const posts = postModel.find()
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const getPostsByUserId = async(req,res,next)=>{
    try{
        const post = new profileService.Post(user_id=req.params.id)
        post.getPostsByUserId()
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
module.exports = {PostById,AllPosts,getPostsByUserId}
const profileService = require('../../services/profileService');
const postModel = require('../../models/postModel')
const UploadS3 = require('../../helpers/customUpload')

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
        const posts = await postModel.find()
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const getPostsByUserId = async(req,res,next)=>{
    try{
        const post = new profileService.Post(id=null,user_id=req.params.id)
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
const newPost = async(req,res,next)=>{
    try{
        const post = new profileService.Post(id=null,user_id=req.user.user.id)
        post.addPost(req.body)
        .then(data=>{
            if(req.files){
                UploadS3.uploadAws(req.files)
                .then(async(response)=>{
                    try{
                        console.log(data)
                        var post = await postModel.findOne({_id:data._id})
                        if(!post){
                            res.status(400).json({message:"User Not Found!"})
                        }
                        else{
                            post.image = response.Location;
                            await post.save()
                            res.status(201).json({message:"Post Created Successfully!"})
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
            res.status(404).json(err)
        })
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
module.exports = {PostById,AllPosts,getPostsByUserId,newPost}
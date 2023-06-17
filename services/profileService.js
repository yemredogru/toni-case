const postModel = require('../models/postModel')
const userModel = require('../models/userModel')

class Post {
    constructor(id=null,user_id=null) {
      this.id = id;
      this.user_id = user_id;
    }
    async getPostById(){
        return new Promise(async(resolve,reject)=>{
            try{
                var post = await postModel.findOne({_id:this.id});
                if(!post){
                    reject("Post not found!")
                }
                else{
                    resolve(post)
                }

            }
            catch(err){
                reject(err)
            }
        })
    }
    async getPostsByUserId(){
        return new Promise(async(resolve,reject)=>{
            try{
                
                var user = await userModel.findOne({_id:this.user_id})
                if(!user)
                {
                    reject("User not found!")
                }
                else{
                    var posts = await postModel.find({user:this.user_id}).populate("user",['-password','-phone_number','-email'])
                    .then(p=>resolve(p))
                    .catch(error=>reject(error));
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async addPost(post){
        return new Promise(async(resolve,reject)=>{
            try{
                var user = await userModel.findOne({_id:this.user_id})
                if(!user)
                {
                    reject("User not found!")
                }
                else{
                    var created_post = await postModel.create({image:post.image,description:post.description})
                    created_post.user = this.user_id
                    await created_post.save()
                    user.posts.push({post_id:created_post._id})
                    await user.save()
                    resolve(created_post)
                    
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    
    
}

module.exports= {Post}
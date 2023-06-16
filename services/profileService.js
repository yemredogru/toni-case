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
                var post = await postModel.findOne(this.id);
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
                var user = await userModel.findOne({id:this.user_id})
                if(!user)
                {
                    reject("User not found!")
                }
                else{
                    var posts = await postModel.find({user:this.user_id})
                    resolve(posts)
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    
}

module.exports= {Post}
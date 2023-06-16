const postModel = require('../models/postModel')

class Post {
    constructor(id=null,user_id=null) {
      this.id = id;
      this.user_id = user_id;
    }
    async getPostById(){
        return new Promise(async(resolve,reject)=>{
            try{
                var post = postModel.findOne(this.id);
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
                
            }
            catch(err){
                reject(err)
            }
        })
    }
    
}

module.exports= {Post}
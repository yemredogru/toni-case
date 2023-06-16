const userModel = require('../models/userModel')

class User {
    constructor(name=null, email=null, password=null,id=null) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.id = id;
    }
    async createUser(){
        return new Promise(async(resolve,reject)=>{
          await userModel.create({name,email,password})
        .then(() => {
            resolve(true)
          })
          .catch(err => {
            reject(err)
          });
        })
    }
    async findById(){
      return new Promise(async(resolve,reject)=>{
        const user_exist = await userModel.findOne({id:this.id}).select(['-password','-refresh_token'])
        if(!user_exist){
          reject("User Not Found")
        }
        else{
          resolve(user_exist)
        }
      })
    }
}

module.exports= {User}
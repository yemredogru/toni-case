require('dotenv').config()
const userModel = require('../models/userModel')

class User {
    constructor(firstName=null,lastName=null,phone_number=null, email=null, password=null,id=null) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone_number = phone_number;
      this.email = email;
      this.password = password;
      this.id = id;
    }
    async createUser(){
        return new Promise(async(resolve,reject)=>{
          await userModel.create(
            {firstName:this.firstName,
              lastName:this.lastName,
              phone_number:this.phone_number,
              email:this.email,
              password:this.password})
        .then((data) => {
            resolve(data)
          })
          .catch(err => {
            console.log(err)
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
const mongoose = require('mongoose')
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
        try{
          console.log(this)
          const user_exist = await userModel.findOne({_id:this.id}).select(['-password','-refresh_token'])
        if(!user_exist){
          reject("User Not Found")
        }
        else{
          resolve(user_exist)
        }
        }
        catch(err){
          reject(err)
        }
      })
    }
    async friendRequest(user_id,request_user_id){
      return new Promise(async(resolve,reject)=>{
        try{
          var user = await userModel.findById(request_user_id)
          console.log(user)
          if(!user){
            reject("User Not Found")
          }
          else{
            
            user.pending_requests.push({request_user_id:user_id})
            await user.save()
            
            resolve(user)
          }
        }
        catch(err){
          reject(err)
        }
      })
    }
    async changeRequestData(user_id,request_by_id){
      return new Promise(async(resolve,reject)=>{
      var user = await userModel.findById(user_id)
      var request_user = await userModel.findById(request_by_id)
      if(!user || !request_user){
        reject("User Not Found")
      }
      else{
        user.friends.push({friend_id:request_by_id})
        user.pending_requests.pull({request_user_id:request_by_id})
        await user.save()
        request_user.friends.push({friend_id:user_id})
        await request_user.save()
        resolve(true)
      }
    })
    }
    async acceptRequest(user_id,request_by_id){
      return new Promise(async(resolve,reject)=>{
        try{
          this.changeRequestData(user_id,request_by_id)
          .then(data=>{
            resolve(data)
          })
          .catch(err=>{
            reject(err)
          })
        }
        catch(err){
          reject(err)
        }
      })
    }
    async rejectRequest(user_id,request_by_id){
      return new Promise(async(resolve,reject)=>{
        try{
          var user = await userModel.findById(user_id)
          if(!user){
            reject("User Not Found")
          }
          else{
            user.pending_requests.pull({request_user_id:request_by_id})
            await user.save()
            resolve(user)
          }
        }
        catch(err){
          reject(err)
        }
      })
    }
}

module.exports= {User}
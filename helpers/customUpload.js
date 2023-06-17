var crypto = require("crypto");
var AWS = require('aws-sdk');

const uploadAws=async(file)=>{
    return new Promise(async(resolve,reject)=>{
      try{
        var id = crypto.randomBytes(20).toString('hex');
        const S3 = new AWS.S3({
          accessKeyId:process.env.ACCESS_KEY,
          secretAccessKey:process.env.SECRET_KEY,
        })
        const fileContent = Buffer.from(file.image.data,'binary');
        const params = {
          Bucket:process.env.S3_BUCKET,
          Key:id,
          Body:fileContent,
          ContentType: 'image/jpeg',
          ACL:'public-read'
        }
        S3.upload(params,(err,data)=>{
          if(err){
            reject(err)
          }
          resolve(data)
        })
      }
      catch(err){
        reject(err)
      }

    })

}
module.exports = {uploadAws}
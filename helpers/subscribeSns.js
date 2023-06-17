const AWS = require('aws-sdk');
const sns = new AWS.SNS({region:'eu-north-1',credentials:{
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
}});
const SubscribeSns=async(email)=>{
    const params = {
        TopicArn: 'arn:aws:sns:eu-north-1:432555270420:test',
        Protocol: 'email',
        Endpoint: email
      };
      sns.subscribe(params, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      
        console.log(data);
        return data
      });
}
const PublishSns=async(firstName,lastName,description,image=null)=>{
    const params = {
        TopicArn: 'arn:aws:sns:eu-north-1:432555270420:test',
        Message: JSON.stringify({
          aps: {
            alert: {
              title: firstName+" "+lastName+" "+"shared a new post",
              body: `
              ${description} 
              <img src=${image}>`
            },
            badge: 1
          }
        }),
      
      };
      sns.publish(params, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      
        console.log(data);
      });
}
module.exports={SubscribeSns,PublishSns}
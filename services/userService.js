class User {
    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
    async createUser(){
        await userModel.create({name,email,password})
        .then(() => {
            res.status(200).json({status:true})
          })
          .catch(err => {
            res.status(400).send(err)
          });
    }
}

module.exports= {User}
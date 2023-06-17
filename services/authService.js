const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')


class Auth {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    async Login() {
        return new Promise(async (resolve, reject) => {
            try{
                const user = await userModel.findOne({ email:this.email })
                if (!user) {
                    reject("User Does Not exist!")
                }
                else {
                    const isEqual = bcrypt.compare(this.password, user.password)
                    if (!isEqual) {
                        reject("Incorrect Message")
                    }
                    else {
                        const payload = {
                            user: {
                                id: user.id,
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName
                            }
                        };
                        jwt.sign(
                            payload,
                            "secretkey",
                            {
                                expiresIn: '24h'
                            },
                            (err, token) => {
                                if (err) throw err;
                                resolve(token)
                            }
                        );
                    }
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
}

module.exports = { Auth }
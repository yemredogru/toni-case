const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined'){
       try{
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const decoded = jwt.verify(bearerToken, "secretkey");
        req.user = decoded
        next();
       }
       catch(err){
            res.status(500).send({ message: "Invalid Token" });
       }
    }
    else{
        res.status(403).json({status:"Unauthorized"})
    }
}
module.exports={verifyToken}
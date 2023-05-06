const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        let decoded = jwt.verify(token, 'MASAI')
        if(decoded){
            next();
        }else{
            res.status(400).send({"message":"Something went wrong"})
        }
    }else{
        res.status(400).send({"message":"Login first"})
    }
}

module.exports={
    auth
}
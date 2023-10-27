const jwt = require('jsonwebtoken')
const secretkey= 'somekey'

exports.isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.send('Token Expires')
    }
    try{
        const decodeToken = jwt.verify(token,secretkey)
        if(!decodeToken){
            return res.send({success:false,
                msg:"Invalid Token"})
        }

        req.user=decodeToken
        next()
    }catch(err){
        res.send(err)
    }
}
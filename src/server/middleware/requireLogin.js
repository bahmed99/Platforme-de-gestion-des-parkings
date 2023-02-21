const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if (!authorization)
    {
        return res.status(401).json({error:"you must be logged in 1"})
    }


    jwt.verify(authorization,process.env.JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.status(401).json({error:"you must be logged in 2"})
        }
        const {id} = payload 
     
            req.user = id
            next()
        })
    
}
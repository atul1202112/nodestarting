const jwt = require('jsonwebtoken')
const verifytoken = (req,res,next) =>{
    const token = req.headers['access-token'];
    if(!token)
        return res.send('access denide');
    else{
        try{
            const verify = jwt.verify(token, process.env.SECRET)
            console.log(token);
            req.user = verify;
            next();
        }
        catch(error)
        {
            res.send('Invalide token ');

        }
    }
}

module.exports =verifytoken
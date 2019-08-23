const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) =>{
    const { authorization } = req.headers;
    // authorization == 'Bearer asjflasdfjkd'
    if(!authorization){
        return res.status(401).send({error: 'You must be logged in.'})
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify( token, 'My_SECRET_KEY', async (err, payload)=>{
        if(err){
            //send opacqed message
            return res.status(401).send({error: 'You must be logged in.'})
        }

        const { userId } = payload;

        //find user in MongoDb by userId from request
        const user = await User.findById(userId);
        //attached user model to req
        req.user =user;
        //middleware done
        next();
    });
};


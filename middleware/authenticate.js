const jwt = require('jsonwebtoken');
const Auth = require('../model/Auth');

module.exports.authenticate = async function(req,res,next){
    const token = req.cookies.token;
    if(token){
        try{
            // here we are extracting the data from the token
            // the jwt package has a function "verify" that requires two arguements
            // 1. token 
            // 2. secret key (for encryption)
            const data = jwt.verify(token,"justarandomkey");
            req.userId = data.userId;
        }
        catch(err){
            console.log(err,"error in verifying jwt");
            return res.redirect('back');
        }
        // This part will work when a user logins using Google
        // isAuthenticated() -> true/false
    } else if(req.isAuthenticated()){
        try{
            const user = await Auth.findOne({email:req.user.emails[0].value});
            req.userId = user?._id;
        } catch(e){
            console.log(e,"error in finding user profile");
            return res.redirect('back');
        }
    } else{
        console.log('No user info found. Please Log in first');
        return res.redirect('back');
    }
    next();
}


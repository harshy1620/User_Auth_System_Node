const Auth = require('../model/Auth');
const alert = require('alert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// for rendering the login page
module.exports.loginpage = function(req, res) {
    return res.render('login',{title:"Login Page"});
}

  // for checcking the data in db making the pass secure(using bcrypt) and redirecting to profile page
module.exports.login = async function(req, res) {
  const {email,password} = req.body;
    const user = await Auth.findOne({ email: email});
    if(!user){
        alert("User does not exist. Please register first.");
        return res.redirect('/');
    } else{
        const isMatch = await bcrypt.compare(password, user.password);
        if((user.email == email) && isMatch){
            //Generating JWT Token
            // we are creating a token using jwt package here
            // this function required 2 arguements: 1. the data you want to store in in the token
            // and 2. a secret key to generate the encoded token
            const token = jwt.sign({userId:user._id},"justarandomkey"); 
            res.cookie('token',token,{httpOnly:true,maxAge:24*60*60*1000});
            alert("Logged in successfully!");
            return res.redirect("/profile");
        } else{
            alert("Invalid email or password!");
            res.redirect('back');
        }
    }  
}


//  signout for both the case (g auth and jwt)
module.exports.signout = async function(req,res){
    // for signing out if the user has logged in by entering email and password
    res.clearCookie('token');
    // for signing out if the user has logged in using google
    req.logout(function(err) {
        if (err) { console.log("error in logout",err); return; }
        else{
            alert("Signed out successfully!");
            return res.redirect('/login');
        }
      });
}





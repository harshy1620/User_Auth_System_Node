
const Auth = require('../model/Auth');
const alert = require('alert');
const bcrypt = require('bcrypt');

module.exports.home = function(req, res) {
  return res.render('home',{title:"Signup Page"});
}

// for sending the data in db making pass safe and redirecting to login page after sign up
module.exports.signup = async function(req, res) {
  const {email,password,confirm_password} = req.body;
  // checking if email already exists in db
  const user = await Auth.findOne({email:email});
  if(user){
    alert("User already exists.");
    return res.redirect('back');
  }
  else{
    if(confirm_password == password){
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password,salt);
      Auth.create({email:email,password:hashPassword})
        .then( user =>{
          alert("Registered successfully.");
          return res.redirect('/login');
        })
        .catch(err => {
          alert("Failed to register.Please try again.");
          console.log(err,'error in registering user');
          return res.redirect('back');
        });
    }
    else{
      alert("Password and Confirm Password do not match!");
      return res.redirect('back');
    }
  }
}


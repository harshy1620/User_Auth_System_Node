const Auth = require('../model/Auth');
const alert = require('alert');
const bcrypt = require('bcrypt');

module.exports.profile = function(req, res) {
    const userId = req.userId;
    Auth.findById(userId)
        .then((user)=>{ 
            return res.render('profile',{user:user});
        })
        .catch(err => {
            console.log(err,"eror in finding user");
            return res.redirect('back');
        })
}


// for reset pass
module.exports.getResetpassPage = function(req, res) {
    return res.render('resetpass',{title:"Reset pass Page"});
}

module.exports.resetpass = async function(req, res) {
    const {password,confirm_password} = req.body;
    try{
        if(password == confirm_password){
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password,salt);
            Auth.findByIdAndUpdate(req.userId,{password:hashPass})
                .then((user)=>{
                    //logout 
                    res.clearCookie('token');
                    req.logout(function(err) {
                        if (err) { 
                            console.log("error in logout",err); 
                            return; 
                        }
                        else{
                            alert("Password changed successfully.Please login again");
                            return res.redirect('/login');
                        }
                    });
                })
                .catch((err)=>{console.log("Error in changing password",err)});
        } else{
            alert('Password and confirm password do not match.');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err,"Error in changing password."); 
        alert('Error in changing password'); 
        return res.redirect('/profile');
    }
}



      
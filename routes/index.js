const express = require('express');
const router=express.Router();
const passport = require('passport');
const alert = require('alert');

const homeController=require('../controller/home_controller');
const profileController=require('../controller/profile_controller');
const loginController=require('../controller/login_controller');
const authenticate =  require('../middleware/authenticate');

// route for sign up page
router.get('/',homeController.home);
router.post('/signup',homeController.signup);

// route for login page
router.get('/login',loginController.loginpage);
router.post('/login',loginController.login);

// router for google auth
//for rendering g auth page
router.get('/auth/google',
    passport.authenticate('google', { scope : ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] })
);

// for callback after clicking on gmail id
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async function(req, res) {
    // Successful authentication, redirect success
    alert("Logged in successfully!");
    return res.redirect('/profile');
});

router.get('/profile',authenticate.authenticate, profileController.profile);

//route for signout in login controller itself
router.get('/signout',authenticate.authenticate, loginController.signout);

//route for reset pass in profile controller itself
router.get('/resetpass',authenticate.authenticate, profileController.getResetpassPage);
router.post('/resetpass',authenticate.authenticate, profileController.resetpass)

module.exports=router;
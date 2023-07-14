// requiring express for making express server
const express= require('express');

// importing model
const Auth =  require('./model/Auth');

//requiring express session
const session=require('express-session');

const GoogleStrategy=require('passport-google-oauth20').Strategy;

// using express as an app
const app = express();

// another module require for views
const path = require('path');

// requiring passport
const passport = require('passport');

// defining the port number
const port=9000;

// importing the database(mongodb)
const db=require('./config/mongoose')

// setting up view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'))

app.use(express.urlencoded());

app.use(express.static("assets"));

// for handling cookie in express app
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//setting express session
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
}));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/',require('./routes'));


// connectiing our aap to google oauth
passport.use(new GoogleStrategy({
    clientID: "646660159294-3qlhefn37v8uvaar577jbdosicuejp0o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9000/auth/google/callback"
},async function(accessToken,refreshToken,profile,cb){
    // creating user in db after login with google
    const email = profile.emails[0].value;
    const user = await Auth.findOne({ email: email });
     if(!user) {
        Auth.create({email})
            .then((user)=>{
                alert("Registered successfully!");
            })
            .catch((err)=>{console.log("Error in registering",err)});
    } 
    return cb(null, profile);
}));

// now user will store in session
passport.serializeUser(function(user,cb){
    cb(null,user);
})

passport.deserializeUser(function(obj,cb){
    cb(null,obj);
})


app.listen(port, function(err){
    if(err){
        console.log('Error in running express server on port',port);
    }
    console.log('Express server is running on port',port);
});
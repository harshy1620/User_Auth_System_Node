const mongoose=require('mongoose'); 

const AuthSchema= new mongoose.Schema({
    email: {
       type: String,
        required:true
    },
    password: {
         type: String,
        // required:true
    }
},{ timestamps:true });
    
const Auth=mongoose.model('Auth',AuthSchema);
module.exports=Auth;

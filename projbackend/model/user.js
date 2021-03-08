const mongoose = require('mongoose');
const cryto = require('crypto');
const {v4 : uuidv4} = require('uuid');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        maxlength : 32,
        trim : true 
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        maxlength : 300
    },
    encryptedPassword : {
        type : String
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    purchases : {
        type : Array,
        default : []
    },
    userDescription : {
        type : String,
        trim : true,
        maxlength : 400
    }
},{timestamps:true});

userSchema.virtual('password').set(function(plainPassword){
    this.password = plainPassword;
    this.salt = uuidv4();
    this.encrytPassword = this.generateHashPassword(plainPassword);
}
).get( function(){
    return this.password
});

userSchema.methods = {
    authenticate : function(password){
        if( this.encrytPassword == this.generateHashPassword(password)){
            return true;
        }else{
            return false;
        }
    },
    generateHashPassword : function(plainPassword){
        if(!plainPassword) return null;
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex'); 
        }catch(err){
            return err;
        }
    }
}

const userModel = new mongoose.model("userModel",userSchema);
export default userModel;
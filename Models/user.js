const mongoose = require('mongoose');
const bcrypt = require('bcrypt');// Password hashing function
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email : {
        type : String
    },
    password :{
        type : String,
    }
})
const user = mongoose.model('Users',userSchema);
module.exports = user
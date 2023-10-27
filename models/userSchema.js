const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        require: true
    },
    lastName:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        next()
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User
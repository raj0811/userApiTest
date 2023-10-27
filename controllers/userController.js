const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const secretkey= 'somekey'
const bcrypt = require('bcrypt')
const resetMailer = require('../mailer/resetpasswordmailer')



module.exports.signup=async function(req,res){
    console.log(req.body);
    const { firstName,lastName,email,password}=req.body
    if(!firstName && !lastName && !email && !password){
        return res.send(`Required field missing`)
    }
    try{
        const checkUser = await User.findOne({email:email})
    if(checkUser){
        return res.send('Email is taken please use another email')
    }

    const user = new User({
        firstName, 
        lastName,
        email,
        password
    })


    await user.save()
    const token = jwt.sign({userId:user._id},secretkey)
    res.cookie('token',token,{httpOnly:true})
    
    return res.send({
        user,
        msg:'User created'
    })
    }catch(err){
        return res.send(err)
    }
}

// login 
module.exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email})
    if(!user){
        return res.send('User not exist')
    }

    const isPasswordValidate =await bcrypt.compare(password,user.password);
    if(!isPasswordValidate){
        return res.status(401).json({error:"Invalid Password"})
    }
    const token = jwt.sign({userId:user._id},secretkey)
    res.cookie('token',token,{httpOnly:true})

    return res.send({success:true,
                    token,
                    user,
                msg:'Loggedin Successfully....'})
    }catch(err){
        res.send(err)
    }
}

// userdata
module.exports.getUserData=async(req,res)=>{
    try{
        console.log('lll');
        const {userId} = req.user
        const user = await User.findById(userId)
        res.send(user)
    }catch(err){
        res.send(err)
    }
}

module.exports.forgetPassword=async(req,res)=>{
    const {email}= req.body
    if(!email){
        return res.send('Please Enter email')
    }

    try{
        console.log(email);
        const user = await User.findOne({email})
        if(!user){
            res.send('User not found with this email')
        }

        const link =`http://localhost/update-password/${user._id}`
        resetMailer.resetMail(email,link)
        return res.send({success:true,msg:'reset link sent to your mail'})

    }catch(err){
        return res.send(err)
    }
}

module.exports.changepasswordPage=async(req,res)=>{
    const {userId}=req.params
    res.render('reset',{
        userId
    })
}

module.exports.updatePassword=async(req,res)=>{
    const {userId}=req.params
    console.log(userId);
    const {password}=req.body
    console.log('test');
    if(!userId ){
        console.log('id missing');
        res.send('UserId is missing')
    }
        try{
            const user=await User.findById(userId)
            if(!user){
                res.send('User not found with this email')
            }

            user.password=password
            await user.save()

            res.send({success:true,msg:"password changed"})
        }catch(err){
            res.send(err)
            // console.log(err);
        }
    }

const nodemailer = require('../config/nodemailer')

exports.resetMail = (email,link)=>{
    console.log(link);
    console.log(email);

    nodemailer.transporter.sendMail({
        
        from:'rpbarmaiya@gmail.com',
        to:email,
        subject:"Password reset link",
        html:`<h1> your password reset link is ${link} </h1>`

    }
    ,(err,info)=>{
        if(err){
            console.log('Error in sending mail...',err);
        }
        console.log(`mail sent ${info}`);
        return
    })
}
const nodemailer =require('nodemailer')

let transporter = nodemailer.createTransport(
    {
    service:'gmail',
    host:'smpt.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.SMPT_MAI,
        pass:process.env.SMPT_PASS
    }
});

// const renderTemplate=(data,templateContent)=>{
//     return new Promise((resolve,reject)=>{
//         const mailOption={
//             from:'rpbarmaiya@gmail.com',
//             to: data.email,
//             subject: "Password Reset Link",
            
//         }
//         transporter.sendMail(mailOption,(err,info)=>{
//             if(err){
//                 res.send(`Error in sending mial ${err}`)
//                 reject(err)
//             }else{
//                 console.log(`Password reset mail sent: ${info}`);
//                 resolve()
//             }
//         })
//     })
// }

module.exports={
    transporter:transporter,
    // renderTemplate:renderTemplate
}
import nodemailer from 'nodemailer';


const mail = async (to, resetURL) => {
    // Generate SMTP service account from ethereal.email
   // nodemailer.createTestAccount((err, account) => {

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS
            }
        });

        // Message object
       
        let info = await transporter.sendMail({
                from: `Talib Guyani | RWH APP <talibguyani@gmail.com>`,
                to: `RHW APP USER <${to}>`,
                subject: 'Here is your password rest code',
                text: 'reset code',
                html: `<a href="${resetURL}">Click this link to reset your password</a>`
        });

//         transporter.sendMail(message, (err, info) => {
//             if (err) {
//                 console.log('Error occurred. ' + err.message);
//                 return process.exit(1);
//             }

            
//  });
    // });


    console.log('Message sent: %s', info.messageId);
}

export default mail;
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: process.env.USER_ID,
        pass: process.env.PASSWORD,
    }

});

exports.sendmail = (email, otp) => {
    let mailOptions = {
        to: email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
    };

    return new Promise(function(resolve, reject) {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({ status: 500, message: "mail not sent successfully.", error: error });
            }

            resolve({ status: 200, message: "mail sent successfully." })
        });

    });
}
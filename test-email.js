require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'CANIL Test Email',
    text: 'If you receive this, Nodemailer is working properly!'
}, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('SUCCESS! Email sent:', info.response);
    }
});
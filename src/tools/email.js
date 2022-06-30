const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xjhoseb@gmail.com',
        pass: 'xqfqorkfxtvzskfa'
    }
});

module.exports = {  transporter };
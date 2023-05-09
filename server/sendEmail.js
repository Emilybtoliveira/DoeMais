const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
});

const enviarEmail = async function (email) {
    const mailOptions = {
        from: 'doemais@gmail.com',
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar email: ', erro);
            return
        } else {
            console.log("Email enviado")
        }
    });

    await email.destroy()
};

module.exports = enviarEmail;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
});

const enviarEmail = async function (email) {
    console.log("TENTAR ENVIAR EMAIL")
    const mailOptions = {
        from: 'doemais@gmail.com',
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar email: ', error);
                reject(error);
            } else {
                console.log("Email enviado");
                resolve(info);
            }
        });
    });

    await email.destroy()
};

module.exports = enviarEmail;
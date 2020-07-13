const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    service: "gmail",
    auth: {
        user: "nationalmaritimepolytechnic@gmail.com",
        pass: "xgedzrlgfrelllhl",
    },
});


exports.transporter = transporter;
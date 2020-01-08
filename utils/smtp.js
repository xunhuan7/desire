const nodeMailer = require("nodemailer");

async function main() {
    await nodeMailer.createTestAccount();
    const transporter = nodeMailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'dengqiyao@geekpark.net',
            pass: '_DQY3264484654dqy_'
        }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'dengqiyao@geekpark.net', // sender address
        to: "dengkanwen@geekpark.net", // list of receivers
        subject: "Test ✔", // Subject line
        text: "THIS IS FROM NODE TRANSFER WRITTEN BY JAYDEN?", // plain text body
        html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);

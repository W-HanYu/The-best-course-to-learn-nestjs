const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false,
  auth: {
    user: "1453300745@qq.com",
    pass: "dbyxfolfoterjiii,", //你的授权码,
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"楠哥" <1453300745@qq.com>',
    to: "860482354@qq.com", //"nannan@163.com",
    subject: "Hello 111",
    html: fs.readFileSync("./index.html"),
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);

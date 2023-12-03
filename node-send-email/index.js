const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false,
  auth: {
    user: "nannan@qq.com",
    pass: "你的授权码,", //你的授权码,
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"楠哥" <nannan@qq.com>',
    to: "taotao@qq.com", //"nannan@163.com",
    subject: "Hello 111",
    html: fs.readFileSync("./index.html"),
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);

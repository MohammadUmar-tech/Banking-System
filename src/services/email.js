import nodemailer from "nodemailer";

export const sendEmailController = async (user) => {
  try {
    console.log("PASS in function:", process.env.NODEMAILER_PASS ? "LOADED" : "UNDEFINED");
    console.log("User:", user.email);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mohumar0240@gmail.com',
        pass: process.env.NODEMAILER_PASS.trim()
      }
    });
    console.log("Email Sending Operation Started")
    const info = await transporter.sendMail({
      from: 'Banking-Ledger <mohumar0240@gmail.com>',
      to: user.email,
      subject: 'Welcome to Banking-Ledger',
      text: `Hi ${user.name},\n\nYour account at Banking-Ledger has been successfully created!\n\nYour Email is : ${user.email}`
    });
    console.log("Email Sending Operation Ended")
    console.log(`Email sent: ${info.messageId}`);
    return info;

  } catch (error) {
    console.error("Full nodemailer error:", error);
    throw error;
  }
}
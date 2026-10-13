// import nodemailer from "nodemailer";

// export const sendEmailController = async (user) => {
//   try {
//     console.log("PASS in function:", process.env.NODEMAILER_PASS ? "LOADED" : "UNDEFINED");

//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: 'mohumar0240@gmail.com',
//         pass: process.env.NODEMAILER_PASS.trim()
//       }
//     });
//     console.log("Email Sending Operation Started")
//     const info = await transporter.sendMail({
//       from: 'Banking-Ledger <mohumar0240@gmail.com>',
//       to:user.email,
//       subject: `✨ Welcome to Banking-Ledger, ${user.name}!`,
//       text:`Welcome to Banking-Ledger, ${user.name}! ✨

// 🎉 Your account is live!

// 📧 Email: ${user.email}
// 🔐 Secured with Banking-Ledger Protection

// Login now and take control of your finances.
// 👉 http://localhost:3000/api/users/login

// Didn't create this? Secure your account: shadow01786@gmail.com

// Stay Secure,
// — Banking-Ledger Team 💳`,
//       html:`
// <div style="margin:0; padding:0; background-color:#f4f5ff; font-family: 'Segoe UI', sans-serif;">
//   <div style="max-width:480px; margin:30px auto; background:white; border-radius:16px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
    
//     <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding:28px; text-align:center;">
//       <h1 style="color:white; margin:0; font-size:22px; letter-spacing:0.5px;">Banking-Ledger 💳</h1>
//     </div>

//     <div style="padding:28px;">
//       <h2 style="margin:0 0 10px 0; color:#111827;">Welcome, ${user.name}! ✨</h2>
//       <p style="color:#4b5563; font-size:14.5px; line-height:22px; margin:0;">
//         Your account has been successfully created. You're now part of Banking-Ledger.
//       </p>

//       <div style="margin:20px 0; background:#f8f7ff; border:1px dashed #c7c3ff; border-radius:10px; padding:14px 16px;">
//         <p style="margin:0; font-size:13px; color:#6b7280;">REGISTERED EMAIL</p>
//         <p style="margin:4px 0 0 0; font-size:15px; font-weight:600; color:#111827;">${user.email}</p>
//       </div>

//       <a href="http://localhost:3000/api/users/login" 
//          style="display:block; text-align:center; background:#4f46e5; color:white; text-decoration:none; padding:13px; border-radius:10px; font-weight:700; font-size:14px; margin-top:10px;">
//          Login to Dashboard →
//       </a>

//       <p style="font-size:12px; color:#9ca3af; text-align:center; margin-top:22px; line-height:18px;">
//         If you didn't create this account, please contact us immediately at<br>
//         <span style="color:#4f46e5; font-weight:600;">shadow01786@gmail.com</span>
//       </p>
//     </div>

//     <div style="background:#fafafa; padding:12px; text-align:center; border-top:1px solid #f0f0f0;">
//       <p style="margin:0; font-size:11px; color:#9ca3af;">© 2026 Banking-Ledger • Secure Banking System</p>
//     </div>

//   </div>
// </div>
// `
//     });
//     console.log("Email Sending Operation Ended")
//     console.log(`Email sent: ${info.messageId}`);
//     return info;

//   } catch (error) {
//     console.error("Full nodemailer error:", error);
//     throw error;
//   }
// }



//  const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server is ready to send messages');
//   }
// });

// // Function to send email
// const sendEmail = async (to, subject, text, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Banking-Ledger" <${process.env.EMAIL_USER}>`,
//       to, 
//       subject,
//       text, 
//       html,
//     });

//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };







// export async function sendEmailForRegisteration(user) {

//   const subject= `✨ Welcome to Banking-Ledger, ${user.name}!`
//   const text= `Welcome to Banking-Ledger, ${user.name}! ✨

// 🎉 Your account is live!

// 📧 Email: ${user.email}
// 🔐 Secured with Banking-Ledger Protection

// Login now and take control of your finances.
// 👉 http://localhost:3000/api/users/login

// Didn't create this? Secure your account: shadow01786@gmail.com

// Stay Secure,
// — Banking-Ledger Team 💳`
// const to=user.email
// const html=`
// <div style="margin:0; padding:0; background-color:#f4f5ff; font-family: 'Segoe UI', sans-serif;">
//   <div style="max-width:480px; margin:30px auto; background:white; border-radius:16px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
    
//     <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding:28px; text-align:center;">
//       <h1 style="color:white; margin:0; font-size:22px; letter-spacing:0.5px;">Banking-Ledger 💳</h1>
//     </div>

//     <div style="padding:28px;">
//       <h2 style="margin:0 0 10px 0; color:#111827;">Welcome, ${user.name}! ✨</h2>
//       <p style="color:#4b5563; font-size:14.5px; line-height:22px; margin:0;">
//         Your account has been successfully created. You're now part of Banking-Ledger.
//       </p>

//       <div style="margin:20px 0; background:#f8f7ff; border:1px dashed #c7c3ff; border-radius:10px; padding:14px 16px;">
//         <p style="margin:0; font-size:13px; color:#6b7280;">REGISTERED EMAIL</p>
//         <p style="margin:4px 0 0 0; font-size:15px; font-weight:600; color:#111827;">${user.email}</p>
//       </div>

//       <a href="http://localhost:3000/api/users/login" 
//          style="display:block; text-align:center; background:#4f46e5; color:white; text-decoration:none; padding:13px; border-radius:10px; font-weight:700; font-size:14px; margin-top:10px;">
//          Login to Dashboard →
//       </a>

//       <p style="font-size:12px; color:#9ca3af; text-align:center; margin-top:22px; line-height:18px;">
//         If you didn't create this account, please contact us immediately at<br>
//         <span style="color:#4f46e5; font-weight:600;">shadow01786@gmail.com</span>
//       </p>
//     </div>

//     <div style="background:#fafafa; padding:12px; text-align:center; border-top:1px solid #f0f0f0;">
//       <p style="margin:0; font-size:11px; color:#9ca3af;">© 2026 Banking-Ledger • Secure Banking System</p>
//     </div>

//   </div>
// </div>
// `
// await sendEmailController({to,subject,text,html})

// }




// import nodemailer from "nodemailer";

// export const sendEmailController = async (user) => {
//   try {
//     console.log("PASS in function:", process.env.NODEMAILER_PASS ? "LOADED" : "UNDEFINED");
//     console.log("User:", user.email);

//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: 'mohumar0240@gmail.com',
//         pass: process.env.NODEMAILER_PASS.trim()
//       }
//     });
//     console.log("Email Sending Operation Started")
//     const info = await transporter.sendMail({
//       from: 'Banking-Ledger <mohumar0240@gmail.com>',
//       to: user.email,
//       subject: `✨ Welcome to Banking-Ledger, ${user.name}!`,
//       text: `Welcome to Banking-Ledger, ${user.name}! ✨

//  🎉 Your account is live!

// 📧 Email: ${user.email}
// 🔐 Secured with Banking-Ledger Protection

// Login now and take control of your finances.
// 👉 http://localhost:3000/api/users/login

// Didn't create this? Secure your account: shadow01786@gmail.com

// Stay Secure,
// — Banking-Ledger Team 💳`,

//     });
//     console.log("Email Sending Operation Ended")
//     console.log(`Email sent: ${info.messageId}`);
//     return info;

//   } catch (error) {
//     console.error("Full nodemailer error:", error);
//     throw error;
//   }
// }


// import nodemailer from "nodemailer";

// export const sendEmailController = async (user,amount,fromAccount,toAccount) => {
//   try {
//     console.log("PASS in function:", process.env.NODEMAILER_PASS ? "LOADED" : "UNDEFINED");
//     console.log("User:", user.email);

//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: 'mohumar0240@gmail.com',
//         pass: process.env.NODEMAILER_PASS.trim()
//       }
//     });
//     console.log("Email Sending Operation Started")
//     if(!amount){

//     const info = await transporter.sendMail({
//       from: 'Banking-Ledger <mohumar0240@gmail.com>',
//       to: user.email,
//       subject: `✨ Welcome to Banking-Ledger, ${user.name}!`,
//       text: `Welcome to Banking-Ledger, ${user.name}! ✨

// 🎉 Your account is live!

// 📧 Email: ${user.email}
// 🔐 Secured with Banking-Ledger Protection

// Login now and take control of your finances.
// 👉 http://localhost:3000/api/users/login

// Didn't create this? Secure your account: shadow01786@gmail.com

// Stay Secure,
// — Banking-Ledger Team 💳`,
//       html: `
// <div style="margin:0; padding:0; background-color:#f4f5ff; font-family: 'Segoe UI', sans-serif;">
//   <div style="max-width:480px; margin:30px auto; background:white; border-radius:16px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
//     <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding:28px; text-align:center;">
//       <h1 style="color:white; margin:0; font-size:22px;">Banking-Ledger 💳</h1>
//     </div>
//     <div style="padding:28px;">
//       <h2 style="margin:0 0 10px 0; color:#111827;">Welcome, ${user.name}! ✨</h2>
//       <p style="color:#4b5563; font-size:14.5px; line-height:22px; margin:0;">Your account has been successfully created. You're now part of Banking-Ledger.</p>
//       <div style="margin:20px 0; background:#f8f7ff; border:1px dashed #c7c3ff; border-radius:10px; padding:14px 16px;">
//         <p style="margin:0; font-size:13px; color:#6b7280;">REGISTERED EMAIL</p>
//         <p style="margin:4px 0 0 0; font-size:15px; font-weight:600; color:#111827;">${user.email}</p>
//       </div>
//       <a href="http://localhost:3000/api/users/login" style="display:block; text-align:center; background:#4f46e5; color:white; text-decoration:none; padding:13px; border-radius:10px; font-weight:700; font-size:14px;">Login to Dashboard →</a>
//     </div>
//   </div>
// </div>
// `
//     });

//   }
//     console.log("Email Sending Operation Ended")
//     console.log(`Email sent: ${info.messageId}`);
//     return info;

//   } catch (error) {
//     console.error("Full nodemailer error:", error);
//     throw error;
//   }
// } 



import nodemailer from "nodemailer";

export const sendEmailController = async (user, amount, fromAccount, toAccount) => {
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
    let info;

    if(!amount){
      info = await transporter.sendMail({
        from: 'Banking-Ledger <mohumar0240@gmail.com>',
        to: user.email,
        subject: `✨ Welcome to Banking-Ledger, ${user.name}!`,
        text: `Welcome to Banking-Ledger, ${user.name}! ✨...`,
        html: `
<div style="margin:0; padding:0; background-color:#f4f5ff; font-family: 'Segoe UI', sans-serif;">
  <div style="max-width:480px; margin:30px auto; background:white; border-radius:16px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding:28px; text-align:center;">
      <h1 style="color:white; margin:0; font-size:22px;">Banking-Ledger 💳</h1>
    </div>
    <div style="padding:28px;">
      <h2 style="margin:0 0 10px 0; color:#111827;">Welcome, ${user.name}! ✨</h2>
      <p style="color:#4b5563; font-size:14.5px; line-height:22px; margin:0;">Your account has been successfully created.</p>
      <div style="margin:20px 0; background:#f8f7ff; border:1px dashed #c7c3ff; border-radius:10px; padding:14px 16px;">
        <p style="margin:0; font-size:13px; color:#6b7280;">REGISTERED EMAIL</p>
        <p style="margin:4px 0 0 0; font-size:15px; font-weight:600; color:#111827;">${user.email}</p>
      </div>
      <a href="http://localhost:3000/api/users/login" style="display:block; text-align:center; background:#4f46e5; color:white; text-decoration:none; padding:13px; border-radius:10px; font-weight:700; font-size:14px;">Login to Dashboard →</a>
    </div>
  </div>
</div>`
      });
    } else {
      // ELSE CASE FOR AMOUNT TRANSFER
      const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount);

      info = await transporter.sendMail({
        from: 'Banking-Ledger <mohumar0240@gmail.com>',
        to: user.email,
        subject: `✅ ${formattedAmount} Sent from ${fromAccount} to ${toAccount}`,
        text: `Hi ${user.name},\n\nYour transfer of ${formattedAmount} from account ${fromAccount} to ${toAccount} was successful.\n\nDate: ${new Date().toLocaleString()}\n\n- Banking-Ledger Team`,
        html: `
<div style="margin:0; padding:0; background-color:#f4f5ff; font-family:'Segoe UI',sans-serif;">
  <div style="max-width:480px; margin:30px auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #059669, #10b981); padding:28px; text-align:center;">
      <h1 style="color:white; margin:0; font-size:20px;">Transfer Successful ✅</h1>
      <p style="color:#d1fae5; margin:8px 0 0; font-size:28px; font-weight:800;">${formattedAmount}</p>
    </div>
    <div style="padding:28px;">
      <p style="color:#111827; margin:0 0 16px;">Hi ${user.name},</p>
      <div style="background:#f9fafb; border-radius:12px; padding:16px; border:1px solid #e5e7eb;">
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
          <span style="color:#6b7280; font-size:13px;">From</span>
          <span style="color:#111827; font-weight:600; font-size:14px;">${fromAccount}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
          <span style="color:#6b7280; font-size:13px;">To</span>
          <span style="color:#111827; font-weight:600; font-size:14px;">${toAccount}</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-top:1px dashed #e5e7eb; padding-top:10px;">
          <span style="color:#6b7280; font-size:13px;">Date</span>
          <span style="color:#111827; font-size:13px;">${new Date().toLocaleString('en-IN')}</span>
        </div>
      </div>
      <p style="color:#6b7280; font-size:12px; margin-top:18px; text-align:center;">If you didn't make this transaction, contact us immediately.</p>
    </div>
  </div>
</div>`
      });
    }

    console.log("Email Sending Operation Ended")
    console.log(`Email sent: ${info.messageId}`);
    return info;

  } catch (error) {
    console.error("Full nodemailer error:", error);
    throw error;
  }
}
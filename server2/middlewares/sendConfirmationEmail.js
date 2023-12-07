const qrCode = require('qrcode');
const nodemailer=require('nodemailer');

const sendConfirmationEmail = async (toEmail, Participantname,eventName, ticketNumber, qrCodePath) => {
    try {
      // Create a transporter using Gmail SMTP (replace with your email and password)
      const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'ugs21036_aids.vijayendher@cbit.org.in',
          pass: 'vijay@2123',
        },
      });
  
      // Define email options
      const mailOptions = {
        from: 'ugs21036_aids.vijayendher@cbit.org.in', // Sender's email address
        to: toEmail,  // Recipient's email address
        subject: `Confirmation for ${eventName} Registration`,
        html: `<p>Dear ${Participantname},</p>
              <p>Thank you for registering for the event "${eventName}".</p>
              <p>Your registration has been confirmed. Your ticket number is ${ticketNumber}.</p>
              <p>We look forward to seeing you at the event!</p>`,
        attachments: qrCodePath
          ? [
              {
                filename: 'qrcode.png',
                path: qrCodePath,
                cid: 'qrcode@cbit.org', // use this cid value in the email body
              },
            ]
          : [],
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
};
module.exports = sendConfirmationEmail;
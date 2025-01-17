import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Créer un transporteur avec la configuration Mailtrap
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Configuration de l'email
  const mailOptions = {
    from: process.env.SMTP_FROM || '"Your App" <noreply@yourapp.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  try {
    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé: ', info.messageId);
  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
};

export default sendEmail;

// netlify/functions/sendEmail.js

const nodemailer = require("nodemailer");

exports.handler = async function (event, context) {
  const { name, email, subject, message } = JSON.parse(event.body);

  // Créer un transporteur pour Nodemailer (ici Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // Votre adresse e-mail Gmail
      pass: process.env.MAIL_PASS, // Votre mot de passe ou app password
    },
  });

  // Définir les options de l'email
  const mailOptions = {
    from: email, // De l'adresse de l'utilisateur
    to: process.env.MAIL_USER, // L'adresse de destination (votre e-mail)
    subject: subject, // Sujet de l'email
    text: `Message de ${name} (${email}):\n\n${message}`, // Corps du message
  };

  try {
    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email envoyé avec succès" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Une erreur est survenue",
        error: error.message,
      }),
    };
  }
};

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gestionmathegame@gmail.com',
        pass: 'Lemotdepasseleplussecuritaire13.', // Remplacez par votre mot de passe ou token d'application.
      },
    });

    const mailOptions = {
      from: email,
      to: 'gestionmathegame@gmail.com',
      subject: `Nouveau message de ${nom}`,
      text: `Nom: ${nom}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Courriel envoyé avec succès !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'envoi du courriel." });
  }
});

module.exports = router;

import nodemailer from 'nodemailer';

export default async function sendEmailNotification(email, name) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'vano-elbrus@mail.ru',
      pass: 'pNRs9wsjPQq5pQsyn1Rm',
    },
  });

  const mailOptions = {
    from: 'vano-elbrus@mail.ru',
    to: email,
    subject: 'Уведомление о заказе',
    text: `Здравствуйте, ${name}! Ваш заказ успешно принят.`,
  };

  await transporter.sendMail(mailOptions);
}

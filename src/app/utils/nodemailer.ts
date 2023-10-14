import nodemailer from 'nodemailer';
import Keys from '../keys';

const sendEmail = (
  email: string,
  subject: string,
  message: string,
  title = 'Play in rwanda',
) => {
  const port = Number(Keys.TRANSPORTER_PORT);
  const transporter = nodemailer.createTransport({
    host: Keys.TRANSPORTER_SERVICE,
    port,
    auth: {
      user: Keys.SERVICE_USERNAME,
      pass: Keys.SERVICE_PASSWORD,
    },
    secure: port === 465,
    logger: false,
    debug: false,
  });
  const Options = {
    from: `${title} <${Keys.SERVICE_USERNAME}>`,
    to: email,
    subject,
    html: message,
  };
  return transporter.sendMail(Options, error => {
    if (error) {
      console.log(error.message);
    }
  });
};

export default sendEmail;

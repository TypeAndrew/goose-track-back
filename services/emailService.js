const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `Todos Admin <${process.env.SENDGRID_FROM}>`;
  }

  _initTransport() {
    if (process.env.NODE_ENV === 'development') {
      // use sendgrid for real emails
      return nodemailer.createTransport({
        service: 'SendGrid',
        secure: false, // use SSL
        port: 25, // port for secure SMTP
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_APIKEY,
        },
        
      tls: {
          rejectUnauthorized: false
      }
      });
    }

    // use mailtrap for testing purposes
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async _send(template, subject ) {
    const html = pug.renderFile(path.join(__dirname, '..', 'views', 'emails', `${template}.pug`), {
      name: this.name,
      url: this.url,
      subject,
    });

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransport().sendMail(emailConfig);
  }

  async sendHello() {
    await this._send('hello', 'Welcome to our great service!!');
  }

  async sendRestorePassword() {
    await this._send('passreset', 'Password reset instructions..');
  }
};
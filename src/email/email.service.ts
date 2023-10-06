import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  private readonly transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'amira66@ethereal.email',
        pass: '4UA7jbAQnqDXsPa2p7',
      },
    });
  }
  async sendPasswordResetEmail(email: string, token: string) {
    const mailOptions = {
      from: 'amira66@ethereal.email',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the following link to reset your password:${token}</p>`,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}

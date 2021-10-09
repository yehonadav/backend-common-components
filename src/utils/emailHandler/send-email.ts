import nodemailer, {SendMailOptions} from 'nodemailer';
import {aws} from "../aws";

export async function sendEmail({ to, subject, html, from, ...props }:SendMailOptions) {
  const transporter = nodemailer.createTransport({SES: new aws.SES({apiVersion: '2010-12-01'})});
  return await transporter.sendMail({ from, to, subject, html, ...props });
}

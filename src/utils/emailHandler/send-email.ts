import nodemailer, {SendMailOptions} from 'nodemailer';
import { getAws } from '../aws'

export async function sendEmail({ to, subject, html, from, ...props }:SendMailOptions) {
  const aws = getAws();
  const transporter = nodemailer.createTransport({SES: new aws.SES({apiVersion: '2010-12-01'})});
  return await transporter.sendMail({ from, to, subject, html, ...props });
}

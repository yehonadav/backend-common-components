import {sendEmail} from './send-email';
import {HTML} from './html_converter';
import {SendMailOptions} from 'nodemailer';
import {getEnvironmentVariable} from "application-common-components";

export class Mail {
  public html: HTML;
  public options: SendMailOptions;

  constructor() {
    const EMAIL_TITLE = getEnvironmentVariable('EMAIL_TITLE');
    const EMAIL_HEADER = getEnvironmentVariable('EMAIL_HEADER');
    const EMAIL_FROM = getEnvironmentVariable('EMAIL_FROM');

    this.html = new HTML(EMAIL_TITLE, EMAIL_HEADER);
    this.options = {};
    this.options.from = EMAIL_FROM;
  }

  send(options:SendMailOptions={}) {
    return sendEmail({
      html: this.html ? this.html.create() : undefined,
      ...this.options,
      ...options,
    });
  }
}

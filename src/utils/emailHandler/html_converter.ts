import escapeHtml from 'escape-html';

import {emailTemplate} from './email_templates/email-template';
import {buttonTemplate} from './email_templates/components/button-template';
import {footerTemplate} from './email_templates/components/footer-template';
import {headerTemplate} from './email_templates/components/header-template';
import {paragraphTemplate} from './email_templates/components/paragraph-template';
import {nyotechFooterTemplate} from './email_templates/components/nyotech-footer-template';

export const splitlines = (value:string) => value.split(/\r?\n/);

export class HTML {
  private button: null|string;
  private components: string[];
  private paragraph: null|string;
  private pre_components: string;
  private post_components: string;

  constructor(title: string, header: string, preheader_text: string = '') {
    this.components = [];
    this.button = null;
    this.paragraph = null;

    const footerComponent = footerTemplate;

    const nyotechFooterComponent = nyotechFooterTemplate;

    const headerComponent = headerTemplate.replace('{{title}}', header);

    const emailComponent = emailTemplate.split('{{components}}', 2);

    this.pre_components = emailComponent[0]
      .replace('{{title}}', escapeHtml(title))
      .replace('{{preheader_text}}', escapeHtml(preheader_text))
      .replace('{{header}}', headerComponent);

    this.post_components = emailComponent[1]
      .replace('{{footer}}', footerComponent)
      .replace('{{nyotech_footer}}', nyotechFooterComponent)
  }

  add_button(link_url: string, text: string){
    if (this.button===null)
      this.button = buttonTemplate;

    const i = this.button.split('{{url}}', 2);
    const component = i[0] + link_url + i[1].replace('{{text}}', escapeHtml(text));
    this.components.push(component);
  };

  // don't use this when user input message, it's unsafe
  add_html(html_content: string) {
    this.components.push(html_content);
  };

  add_link(url: string) {
    this.components.push(`<a href="${url}">${url}</a>`)
  }

  add_paragraph(text: string){
    if (this.paragraph === null)
      this.paragraph = paragraphTemplate;

    splitlines(text)
      .filter((line:string)=>line)
      .forEach((line:string) => {
      // @ts-ignore
        this.components.push(this.paragraph
        .replace('{{text}}', escapeHtml(line)))
    })
  };

  create()
  {
    return [this.pre_components, ...this.components, this.post_components].join('\n')
  };
}

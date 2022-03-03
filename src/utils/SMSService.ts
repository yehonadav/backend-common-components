'use strict';

import { getAws } from './aws'
import {SNS} from 'aws-sdk';

export interface ISMSMessage {
  phoneNumber: string;
  message: string;
  title: string; // 3-11 long alpha-numeric
}

export class SMSService {
  private SNS: SNS;

  constructor() {
    const aws = getAws();
    this.SNS = new aws.SNS({ apiVersion: '2010-03-31' });
  }

  /** Sends a SMS message to the specified phone number.
    * Returns the message ID from SNS */
  async sendMessage({phoneNumber, message, title}:ISMSMessage):Promise<string|undefined> {
    const res = await this.SNS.publish({
      Message: message,
      PhoneNumber: phoneNumber,
      MessageAttributes:{
        "AWS.SNS.SMS.SenderID" : {
          DataType: "String",
          StringValue: title, // 3-11 long alpha-numeric
        }
      },
    }).promise();

    return res.MessageId
  }
}

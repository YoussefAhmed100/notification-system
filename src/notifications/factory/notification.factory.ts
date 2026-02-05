import { Injectable } from "@nestjs/common";
import { EmailSender } from "../senders/email.sender";
import { SmsSender } from "../senders/sms.sender";
import { PushSender } from "../senders/push.sender";
import { INotificationSender } from "../contracts/Inotification";

@Injectable()
export class NotificationFactory {
  constructor(
    private readonly email: EmailSender,
    private readonly sms: SmsSender,
    private readonly push: PushSender,
  ) {}

  getSender(type: string): INotificationSender {
    switch (type) {
      case 'email':
        return this.email;

      case 'sms':
        return this.sms;

      case 'push':
        return this.push;

      default:
        throw new Error('Unsupported notification type');
    }
  }
}

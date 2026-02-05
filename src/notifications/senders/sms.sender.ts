import { Injectable } from "@nestjs/common";
import { INotificationSender } from "../contracts/Inotification";

@Injectable()
export class SmsSender implements INotificationSender {
  async send(recipient: string, message: string): Promise<void> {
    console.log(`SMS -> ${recipient}: ${message}`);
  }
}
import { Injectable } from "@nestjs/common";
import { INotificationSender } from "../contracts/Inotification";

@Injectable()
export class EmailSender implements INotificationSender {
  async send(recipient: string, message: string): Promise<void> {
    console.log(`Email -> ${recipient}: ${message}`);
  }
}
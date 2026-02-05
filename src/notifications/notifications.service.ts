import { Injectable } from "@nestjs/common";
import { NotificationFactory } from "./factory/notification.factory";

@Injectable()
export class NotificationService {
  constructor(private readonly factory: NotificationFactory) {}

  async send(type: string, recipient: string, message: string) {
    const sender = this.factory.getSender(type);

    await sender.send(recipient, message);
  }
}

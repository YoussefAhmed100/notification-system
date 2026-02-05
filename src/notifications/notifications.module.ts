import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';
import { NotificationFactory } from './factory/notification.factory';

import { EmailSender } from './senders/email.sender';
import { SmsSender } from './senders/sms.sender';
import { PushSender } from './senders/push.sender';

@Module({
  controllers: [NotificationController],

  providers: [
    NotificationService,
    NotificationFactory,

    
    EmailSender,
    SmsSender,
    PushSender,
  ],

  exports: [NotificationService], 
})
export class NotificationsModule {}

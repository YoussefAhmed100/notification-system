import { Body, Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";

@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  async send(@Body() dto: CreateNotificationDto) {
    await this.service.send(dto.type, dto.recipient, dto.message);

    return { success: true };
  }
}

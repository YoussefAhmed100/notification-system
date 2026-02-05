import { IsString, IsNotEmpty, IsIn, IsISO8601 } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsIn(['email', 'sms', 'push'])
  type: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  // @IsISO8601()
  // scheduledAt: string;  // ISO date string
}

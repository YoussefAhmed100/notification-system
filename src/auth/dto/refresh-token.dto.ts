import { IsString, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @IsUUID()
  userId: string;

  @IsString()
  refreshToken: string;
}

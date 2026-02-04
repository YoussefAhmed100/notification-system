import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
export class RegisterDto {
@IsNotEmpty()
  @MinLength(3)
  
  userName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  
  password: string;
}

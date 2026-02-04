import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  }

  async hashRefreshToken(token: string) {
    return bcrypt.hash(token, 10);
  }

  async compareRefreshToken(token: string, hash: string) {
    return bcrypt.compare(token, hash);
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token);
  }
}

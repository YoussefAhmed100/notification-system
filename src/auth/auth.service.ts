import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import { eq } from 'drizzle-orm';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from '../users/schema/schema';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { PasswordService } from './utils/password.service';
import { TokenService } from './utils/token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

 
  async register(dto: RegisterDto) {
    const exists = await this.db.query.users.findFirst({
      where: eq(schema.users.email, dto.email),
    });

    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword =
      await this.passwordService.hash(dto.password);

    const [user] = await this.db
      .insert(schema.users)
      .values({
        email: dto.email,
        userName: dto.userName,
        password: hashedPassword,
       
      })
      .returning();

    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, dto.email),
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid =
      await this.passwordService.compare(
        dto.password,
        user.password,
      );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user);
  }

  async logout(userId: string) {
    await this.db
      .update(schema.users)
      .set({ refreshTokenHash: null })
      .where(eq(schema.users.id, userId));
  }

 async refresh(userId: string, refreshToken: string) {
  const user = await this.db.query.users.findFirst({
    where: eq(schema.users.id, userId),
  });

  if (!user || !user.refreshTokenHash) {
    throw new UnauthorizedException();
  }

  const isValid = await this.tokenService.compareRefreshToken(
    refreshToken,
    user.refreshTokenHash,
  );

  if (!isValid) {
    throw new UnauthorizedException();
  }

  return this.issueTokens(user);
}


  private async issueTokens(user: {
    id: string;
    userName: string;
    email: string;
    role: string;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      this.tokenService.generateAccessToken(payload);

    const refreshToken =
      this.tokenService.generateRefreshToken(payload);

    const refreshTokenHash =
      await this.tokenService.hashRefreshToken(refreshToken);

    await this.db
      .update(schema.users)
      .set({ refreshTokenHash })
      .where(eq(schema.users.id, user.id));

    return {
      accessToken,
      refreshToken,
    };
  }
}

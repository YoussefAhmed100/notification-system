import { Inject, Injectable, Type } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { DATABASE_CONNECTION } from '../database/database-connection'

@Injectable()
export class UsersService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database:NodePgDatabase<typeof schema> ,
    ) {}

    async findAllUsers() {
        return this.database.query.users.findMany();
    }

    
async createUser(user: typeof schema.users.$inferInsert) {
  const [createdUser] = await this.database
    .insert(schema.users)
    .values(user)
    .returning();

  return createdUser;
}

 
}

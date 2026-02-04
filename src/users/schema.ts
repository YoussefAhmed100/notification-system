import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  userName: varchar('user_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('USER'),
  refreshTokenHash: varchar('refresh_token_hash', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import { users } from '../users/schema/schema';

type NewUser = typeof users.$inferInsert;

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });

  const db = drizzle(pool);

  const BATCH_SIZE = 5;
  const TOTAL = 50;

  for (let offset = 0; offset < TOTAL; offset += BATCH_SIZE) {
    const batchUsers: NewUser[] = [];

    for (let i = 1; i <= BATCH_SIZE; i++) {
      const index = offset + i;

      batchUsers.push({
        userName: `user_${index}`,
        email: `user${index}@gmail.com`,
        password: await bcrypt.hash('Password123!', 10),
        role: index === 1 ? 'ADMIN' : 'USER',
      });
    }

    await db.insert(users).values(batchUsers);
    console.log(`✅ Inserted users ${offset + 1} → ${offset + BATCH_SIZE}`);
  }

  await pool.end();
  console.log('🎉 Seeding completed');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});

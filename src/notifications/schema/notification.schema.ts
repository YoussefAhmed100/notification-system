import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),

  type: varchar("type", { length: 20 }).notNull(), // email | sms | push

  recipient: varchar("recipient", { length: 255 }).notNull(),

  subject: varchar("subject", { length: 255 }),

  body: text("body").notNull(),

  status: varchar("status", { length: 20 })
    .$type<"pending" | "processing" | "sent" | "failed">()
    .default("pending"),

  scheduledAt: timestamp("scheduled_at"),

  retryCount: integer("retry_count").default(0),

  createdAt: timestamp("created_at").defaultNow(),
});

// export type Notification = typeof notifications.inferSelect();
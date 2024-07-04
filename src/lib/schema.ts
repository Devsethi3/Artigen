import {
  timestamp,
  pgTable,
  text,
  serial,
  varchar,
  index,
} from "drizzle-orm/pg-core";

export const AiResult = pgTable(
  "aiResult",
  {
    id: serial("id").primaryKey(),
    formData: varchar("formData", { length: 255 }).notNull(),
    aiResponse: text("aiResponse").notNull(), // Make this not null if it's expected to always have a response
    slug: varchar("slug", { length: 255 }).notNull(),
    createdBy: varchar("createdBy", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      slugIdx: index("slug_idx").on(table.slug),
    };
  }
);

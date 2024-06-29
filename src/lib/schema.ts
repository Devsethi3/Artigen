import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AiResult = pgTable("aiResult", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  slug: varchar("slug").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

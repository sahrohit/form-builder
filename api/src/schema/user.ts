import { relations, type InferSelectModel } from "drizzle-orm";
import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { forms } from "./form";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 128 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isAdmin: boolean("is_admin").notNull().default(false),
  password: text("password").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  salt: text("salt").notNull(),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  forms: many(forms),
}));

export const selectUserSchema = createSelectSchema(users, {
  email: (schema) =>
    schema.email
      .email()
      .regex(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/i),
});

export const verifyUserSchema = z.object({
  query: selectUserSchema.pick({
    email: true,
    code: true,
  }),
});

export const deleteUserSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
  }),
});

export const loginSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
    password: true,
  }),
});

export const addUserSchema = z.object({
  body: selectUserSchema.pick({
    name: true,
    email: true,
    password: true,
  }),
});

export const updateUserSchema = z.object({
  body: selectUserSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .partial(),
});

export const newUserSchema = z.object({
  body: selectUserSchema.pick({
    name: true,
    email: true,
    password: true,
  }),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = z.infer<typeof newUserSchema>["body"];
export type UpdateUser = z.infer<typeof updateUserSchema>["body"];

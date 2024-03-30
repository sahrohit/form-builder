import { relations } from "drizzle-orm";
import { boolean, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { users } from "./user";
import { fieldTypeEnum, questions } from "./question";
import { formSubmissions } from "./form-submission";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { insertFieldOptionsSchema } from "./field-option";
import { createId } from "@paralleldrive/cuid2";

export const forms = mysqlTable("forms", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text("name"),
  description: text("description"),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.id),
  published: boolean("published"),
});

export const formsRelations = relations(forms, ({ many, one }) => ({
  questions: many(questions),
  user: one(users, {
    fields: [forms.userId],
    references: [users.id],
  }),
  submissions: many(formSubmissions),
}));

export const selectFormSchema = createSelectSchema(forms);

export const addNewFormSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    questions: z.array(
      z.object({
        text: z.string(),
        fieldType: z.enum(fieldTypeEnum),
        fieldOptions: z.array(
          insertFieldOptionsSchema.pick({
            text: true,
            value: true,
          })
        ),
      })
    ),
  }),
});

export const deleteFormSchema = z.object({
  body: selectFormSchema.pick({
    id: true,
  }),
});

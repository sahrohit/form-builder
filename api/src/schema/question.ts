import { relations } from "drizzle-orm";
import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { forms } from "./form";
import { fieldOptions } from "./field-option";
import { answers } from "./answer";
import { createSelectSchema } from "drizzle-zod";
import { createId } from "@paralleldrive/cuid2";

export const fieldTypeEnum = [
  "RadioGroup",
  "Select",
  "Input",
  "Textarea",
  "Switch",
] as const;

export const questions = mysqlTable("questions", {
  id: varchar("id", {
    length: 128,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  text: text("text"),
  fieldType: text("field_type", {
    enum: fieldTypeEnum,
  }),
  formId: varchar("form_id", {
    length: 128,
  }),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
  form: one(forms, {
    fields: [questions.formId],
    references: [forms.id],
  }),
  fieldOptions: many(fieldOptions),
  answers: many(answers),
}));

export const insertQuestionSchema = createSelectSchema(questions);

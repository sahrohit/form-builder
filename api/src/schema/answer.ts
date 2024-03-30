import { relations } from "drizzle-orm";
import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { questions } from "./question";
import { formSubmissions } from "./form-submission";
import { fieldOptions } from "./field-option";
import { createId } from "@paralleldrive/cuid2";

export const answers = mysqlTable("answers", {
  id: varchar("id", {
    length: 128,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  value: text("value"),
  questionId: varchar("question_id", {
    length: 128,
  }),
  formSubmissionId: varchar("form_submission_id", {
    length: 128,
  }),
  fieldOptionsId: varchar("field_options_id", {
    length: 128,
  }).references(() => fieldOptions.id),
});

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  formSubmission: one(formSubmissions, {
    fields: [answers.formSubmissionId],
    references: [formSubmissions.id],
  }),
  fieldOption: one(fieldOptions, {
    fields: [answers.fieldOptionsId],
    references: [fieldOptions.id],
  }),
}));

import { relations } from "drizzle-orm";
import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { questions } from "./question";
import { createSelectSchema } from "drizzle-zod";
import { createId } from "@paralleldrive/cuid2";

export const fieldOptions = mysqlTable("field_options", {
	id: varchar("id", {
		length: 128,
	})
		.primaryKey()
		.$defaultFn(() => createId()),
	text: text("text"),
	value: text("value"),
	questionId: varchar("question_id", { length: 128 }),
});

export const fieldOptionsRelations = relations(fieldOptions, ({ one }) => ({
	question: one(questions, {
		fields: [fieldOptions.questionId],
		references: [questions.id],
	}),
}));

export const insertFieldOptionsSchema = createSelectSchema(fieldOptions);

import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { forms } from "./form";
import { answers } from "./answer";
import { createId } from "@paralleldrive/cuid2";

export const formSubmissions = mysqlTable("form_submissions", {
	id: varchar("id", {
		length: 128,
	})
		.primaryKey()
		.$defaultFn(() => createId()),
	formId: varchar("form_id", {
		length: 128,
	}),
});

export const formSubmissionsRelations = relations(formSubmissions, ({ one, many }) => ({
	form: one(forms, {
		fields: [formSubmissions.formId],
		references: [forms.id],
	}),
	answers: many(answers),
}));

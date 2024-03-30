import { formSubmissions } from "@/schema";
import { forms } from "@/schema/form";
import { answers as dbAnswers } from "@/schema/answer";
import { createHandler } from "@/utils/create";
import { db } from "@/utils/db";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const handleSubmissionCreate = createHandler(
  z.object({
    body: z.object({
      formId: z.string(),
      answers: z.array(
        z.object({
          questionId: z.string(),
          fieldOptionsId: z.string().nullable(),
          value: z.string().nullable(),
        })
      ),
    }),
  }),

  async (req, res) => {
    const { formId, answers } = req.body;

    const insertedId = createId();

    await db.insert(formSubmissions).values({
      id: insertedId,
      formId,
    });

    await db.transaction(async (tx) => {
      for (const answer of answers) {
        const answerId = createId();

        await tx.insert(dbAnswers).values({
          id: answerId,
          formSubmissionId: insertedId,
          ...answer,
        });
      }
    });

    res.status(200).json({ formSubmissionsId: insertedId });
  }
);

export const handleSubmissionList = createHandler(
  z.object({
    body: z.object({
      formId: z.string(),
    }),
  }),
  async (req, res) => {
    const { formId } = req.body;

    const form = await db.query.forms.findFirst({
      where: eq(forms.id, formId),
      with: {
        questions: {
          with: {
            fieldOptions: true,
          },
        },
        submissions: {
          with: {
            answers: {
              with: {
                fieldOption: true,
              },
            },
          },
        },
      },
    });

    console.log("Form");

    res.status(200).json(form);
  }
);

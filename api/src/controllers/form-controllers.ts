import { fieldOptions } from "@/schema";
import { addNewFormSchema, deleteFormSchema, forms } from "@/schema/form";
import { questions as dbQuestions } from "@/schema/question";
import type { User } from "@/schema/user";
import { createHandler } from "@/utils/create";
import { db } from "@/utils/db";
import { BackendError } from "@/utils/errors";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";

export const handleGetFormById = createHandler(async (req, res) => {
  const { formId } = req.params as { formId: string };

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });

  if (!form) {
    throw new BackendError("NOT_FOUND");
  }

  res.status(200).json(form);
});

export const handleGetFormByUser = createHandler(async (_req, res) => {
  const { user } = res.locals as { user: User };

  const form = await db.query.forms.findMany({
    where: eq(forms.userId, user.id),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });

  res.status(200).json(form);
});

export const handleCreateNewForm = createHandler(
  addNewFormSchema,
  async (req, res) => {
    const { name, description, questions } = req.body;

    const { user } = res.locals as { user: User };

    const formId = createId();

    await db.insert(forms).values({
      id: formId,
      name,
      description,
      userId: user.id,
      published: false,
    });

    // TODO: add questions and options
    const newQuestions = questions.map((question) => {
      return {
        text: question.text,
        fieldType: question.fieldType,
        fieldOptions: question.fieldOptions,
        formId,
      };
    });

    await db.transaction(async (tx) => {
      for (const question of newQuestions) {
        const questionId = createId();

        await tx.insert(dbQuestions).values({ ...question, id: questionId });

        if (question.fieldOptions && question.fieldOptions.length > 0) {
          await tx.insert(fieldOptions).values(
            question.fieldOptions.map((option) => ({
              text: option.text,
              value: option.value,
              questionId,
            }))
          );
        }
      }
    });

    res.status(200).json({ formId });
  }
);

export const handleDeleteForm = createHandler(
  deleteFormSchema,
  async (req, res) => {
    const { id } = req.body;
    const { user } = res.locals as { user: User };

    await db
      .delete(forms)
      .where(and(eq(forms.id, id), eq(forms.userId, user.id)));

    res.status(200).json({ success: true });
  }
);

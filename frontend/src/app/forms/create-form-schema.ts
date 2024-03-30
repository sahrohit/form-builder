import { z } from "zod";

export const fieldTypeEnum = [
  "RadioGroup",
  "Select",
  "Input",
  "Textarea",
  "Switch",
] as const;

export const CreateFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  answers: z.array(
    z.object({
      text: z.string(),
      fieldType: z.enum(fieldTypeEnum),
      fieldOptions: z.array(
        z.object({
          text: z.string(),
          value: z.string(),
        })
      ),
    })
  ),
});

export type CreateFormValues = z.infer<typeof CreateFormSchema>;

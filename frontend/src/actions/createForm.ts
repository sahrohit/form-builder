"use server";

import { CreateFormValues } from "@/components/forms/create-form/options-selector";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createForm = async ({ answers, description, name }: CreateFormValues) => {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/form", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookies().get("session-token")?.value}`,
		},
		body: JSON.stringify({
			name,
			description,
			questions: answers,
		}),
		cache: "no-store",
	}).then(res => res.json());

	revalidatePath("/view-forms");

	return res;
};

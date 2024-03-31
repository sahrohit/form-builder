"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteForm = async ({
	id,
}: {
	id: string;
}) => {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/form", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookies().get("session-token")?.value}`,
		},
		body: JSON.stringify({
			id,
		}),
		cache: "no-store",
	}).then(res => res.json());

	revalidatePath("/view-forms");

	return res;
};

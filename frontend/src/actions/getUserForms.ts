import { cookies } from "next/headers";

export const getUserForms = async () => {
	const forms = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/form`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookies().get("session-token")?.value}`,
		},
		cache: "no-store",
	}).then(res => res.json());

	return forms;
};

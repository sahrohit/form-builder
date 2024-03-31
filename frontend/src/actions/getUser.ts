"use server";

import { cookies } from "next/headers";

export const getUser = async () => {
	const session = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${cookies().get("session-token")?.value ?? ""}`,
		},
		cache: "no-store",
	}).then(res => res.json());

	return session;
};

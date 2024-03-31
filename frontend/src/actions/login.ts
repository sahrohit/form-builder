"use server";

import { cookies } from "next/headers";

export const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
		cache: "no-store",
	}).then(res => res.json());

	if (res.token) {
		cookies().delete("session-token");
		cookies().set("session-token", res.token);
		return {
			success: true,
		};
	} else {
		return {
			success: false,
		};
	}
};

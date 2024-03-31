import { users, type NewUser, type UpdateUser, type User } from "@/schema/user";
import { db } from "@/utils/db";
import { BackendError } from "@/utils/errors";
import { sha256 } from "@/utils/hash";
import { createId } from "@paralleldrive/cuid2";
import argon2 from "argon2";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export const getUserByUserId = async (userId: string) => {
	const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
	return user;
};

export const getUserByEmail = async (email: string) => {
	const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
	return user;
};

export const addUser = async (user: NewUser) => {
	const { password, ...userDetails } = user;

	const userId = createId();
	const salt = crypto.randomBytes(32);
	const code = crypto.randomBytes(32).toString("hex");
	const hashedPassword = await argon2.hash(password, {
		salt,
	});

	await db.insert(users).values({
		...userDetails,
		id: userId,
		password: hashedPassword,
		salt: salt.toString("hex"),
		code,
		isVerified: true, // Verification
	});

	const insertedUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, userId),
	});

	if (!insertedUser) {
		throw new BackendError("INTERNAL_ERROR", {
			message: "Failed to add user",
		});
	}

	const newUser = await db
		.select()
		.from(users)
		.where(eq(users.id, insertedUser.id))
		.limit(1);

	if (!newUser) {
		throw new BackendError("INTERNAL_ERROR", {
			message: "Failed to add user",
		});
	}

	return { user: newUser, code };
};

export const verifyUser = async (email: string, code: string) => {
	const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

	if (!user) {
		throw new BackendError("USER_NOT_FOUND");
	}

	if (user.isVerified) {
		throw new BackendError("CONFLICT", {
			message: "User already verified",
		});
	}

	const isVerified = sha256.verify(code, user.code);

	if (!isVerified) {
		throw new BackendError("UNAUTHORIZED", {
			message: "Invalid verification code",
		});
	}

	const [updatedUser] = await db
		.update(users)
		.set({ isVerified })
		.where(eq(users.email, email));

	if (updatedUser.affectedRows === 0) {
		throw new BackendError("INTERNAL_ERROR", {
			message: "Failed to verify user",
		});
	}
};

export const deleteUser = async (email: string) => {
	const user = await getUserByEmail(email);

	if (!user) {
		throw new BackendError("USER_NOT_FOUND");
	}

	const [deletedUser] = await db.delete(users).where(eq(users.email, email));

	return deletedUser;
};

export const updateUser = async (user: User, { name, email, password }: UpdateUser) => {
	let code: string | undefined;
	let hashedCode: string | undefined;

	if (email) {
		const user = await getUserByEmail(email);

		if (user) {
			throw new BackendError("CONFLICT", {
				message: "Email already in use",
				details: { email },
			});
		}

		code = crypto.randomBytes(32).toString("hex");
		hashedCode = sha256.hash(code);
	}

	const [updatedUser] = await db
		.update(users)
		.set({
			name,
			password,
			email,
			code: hashedCode,
			isVerified: hashedCode ? false : user.isVerified,
		})
		.where(eq(users.email, user.email));

	if (!updatedUser) {
		throw new BackendError("USER_NOT_FOUND", {
			message: "User could not be updated",
		});
	}

	return updatedUser;
};

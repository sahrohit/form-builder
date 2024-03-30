import {
  deleteUserSchema,
  loginSchema,
  newUserSchema,
  updateUserSchema,
  type User,
} from "@/schema/user";
import {
  addUser,
  deleteUser,
  getUserByEmail,
  updateUser,
} from "@/services/user-services";
import { createHandler } from "@/utils/create";
import { BackendError } from "@/utils/errors";
import generateToken from "@/utils/jwt";
import argon2 from "argon2";

export const handleUserLogin = createHandler(loginSchema, async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    throw new BackendError("USER_NOT_FOUND");
  }

  const matchPassword = await argon2.verify(user.password, password, {
    salt: Buffer.from(user.salt, "hex"),
  });
  if (!matchPassword) {
    throw new BackendError("INVALID_PASSWORD");
  }

  const token = generateToken(user.id);

  res.cookie("session-token", token);

  res.status(200).json({ token });
});

export const handleAddUser = createHandler(newUserSchema, async (req, res) => {
  const user = req.body;

  const existingUser = await getUserByEmail(user.email);

  if (existingUser) {
    throw new BackendError("CONFLICT", {
      message: "User already exists",
    });
  }

  const { user: addedUser, code } = await addUser(user);

  // Send Verifcation Email

  console.log("Verification Code", code);

  res.status(201).json(addedUser);
});

export const handleDeleteUser = createHandler(
  deleteUserSchema,
  async (req, res) => {
    const { email } = req.body;

    const { user } = res.locals as { user: User };

    if (user.email !== email && !user.isAdmin) {
      throw new BackendError("UNAUTHORIZED", {
        message: "You are not authorized to delete this user",
      });
    }

    const deletedUser = await deleteUser(email);

    res.status(200).json({
      user: deletedUser,
    });
  }
);

export const handleGetUser = createHandler(async (_req, res) => {
  const { user } = res.locals as { user: User };

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  });
});

export const handleUpdateUser = createHandler(
  updateUserSchema,
  async (req, res) => {
    const { user } = res.locals as { user: User };

    const { name, password, email } = req.body;

    const updatedUser = await updateUser(user, { name, password, email });

    res.status(200).json({
      user: updatedUser,
    });
  }
);

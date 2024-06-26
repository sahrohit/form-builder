import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/schema";

const connection = mysql.createPool(process.env.DATABASE_URL);

export const db = drizzle(connection, {
	mode: "default",
	schema,
	logger: true,
});

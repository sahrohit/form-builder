import { migrate } from "drizzle-orm/mysql2/migrator";
import drizzleConfig from "../drizzle.config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@/schema";
import "dotenv/config";

const main = async () => {
	const connection = mysql.createPool(process.env.DATABASE_URL);

	await migrate(
		drizzle(connection, {
			mode: "default",
			schema,
			logger: true,
		}),
		{ migrationsFolder: drizzleConfig.out }
	);

	await connection.end();
};

main();

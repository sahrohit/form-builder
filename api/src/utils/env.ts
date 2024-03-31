import { z, ZodError } from "zod";
import "dotenv/config";

const configSchema = z.object({
	PORT: z
		.string()
		.regex(/^\d{4,5}$/)
		.optional()
		.default("3000"),
	DATABASE_URL: z
		.string()
		.url()
		.refine(
			url => url.startsWith("mysql://") || url.startsWith("mysql://"),
			"DATABASE_URL must be a valid mysql url"
		),
	JWT_SECRET: z.string(),
});

try {
	configSchema.parse(process.env);
} catch (error) {
	if (error instanceof ZodError) {
		console.error(error.errors);
	}
	process.exit(1);
}

export type Env = z.infer<typeof configSchema>;

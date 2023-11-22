import { configDotenv } from "dotenv"
import type { Config } from "drizzle-kit"
configDotenv()

if (typeof process.env.DB !== "string") {
	console.error("The environment variable 'DB' must be a string.")
	process.exit(1)
}

export default {
	schema: "./src/schema.ts",
	out: "./migrations",
	driver: "better-sqlite",
	dbCredentials: {
		url: process.env.DB as unknown as string,
	},
} satisfies Config

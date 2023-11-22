import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"

if (typeof process.env.DB !== "string") {
	process.exit(1)
}

const sqlite = new Database(process.env.DB as unknown as "string")
export default drizzle(sqlite)

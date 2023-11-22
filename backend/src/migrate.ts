import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import db from "./db"

export default function runMigrate() {
	migrate(db, { migrationsFolder: "./migrate" })
}

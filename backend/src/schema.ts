import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core"

enum Permission {
	// Directory operation
	DeleteDirectory = "dd",
	CreateDirectory = "cd",
	ReadDirectory = "rd",
	EditDirectory = "ed",

	// File operation
	DeleteFile = "df",
	CreateFile = "cf",
	ReadFile = "rf",
	EditFile = "ef",
}

export const users = sqliteTable("users", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	username: text("username"),
	createdAt: integer("createdAt", { mode: "timestamp" }),
    roles: text("roles", { mode: "json" }).$type<number[]>()
})

export const roles = sqliteTable("roles", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name"),
	isDefault: integer("isDefault", { mode: "boolean" }),
	isAdministrator: integer("isDefault", { mode: "boolean" }),
	permissions: text("permissions", { mode: "json" }).$type<Permission[]>(),
})

import { configDotenv } from "dotenv"
import migrate from "./src/migrate"

configDotenv()
migrate()

// import fastify from "fastify"

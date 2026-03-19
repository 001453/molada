import dotenv from "dotenv";
import { defineConfig } from "@prisma/config";

dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});


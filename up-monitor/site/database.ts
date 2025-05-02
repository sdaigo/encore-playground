import { SQLDatabase } from "encore.dev/storage/sqldb";
import { PrismaClient } from "./generated/prisma/client";

const DB = new SQLDatabase("sites", {
  migrations: {
    path: "./prisma/migrations",
    source: "prisma",
  },
});

// Setup prisma client with connection string
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DB.connectionString,
    },
  },
});

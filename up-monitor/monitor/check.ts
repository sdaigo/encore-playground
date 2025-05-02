import { api } from "encore.dev/api";
import { prisma } from "./database";
import { ping } from "./ping";
import { site } from "~encore/clients";

export interface CheckParams {
  id: string;
}

export interface CheckResponse {
  up: boolean;
}

export const check = api<CheckParams, CheckResponse>(
  { expose: true, path: "/check/:id", method: "POST" },
  async ({ id }) => {
    const s = await site.get({ id });
    const { up } = await ping({ url: s.url });

    await prisma.checks.create({ data: { siteId: id, up } });

    return { up };
  },
);

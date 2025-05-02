import { api, APIError } from "encore.dev/api";
import { prisma } from "./database";

export interface Site {
  id: string;
  url: string;
}

export interface AddParams {
  url: string;
}

export const add = api<AddParams, Site>(
  { expose: true, path: "/site", method: "POST" },
  async ({ url }) => {
    const site = await prisma.site.create({ data: { url } });
    return site;
  },
);

export interface GetParams {
  id: string;
}

export const get = api<GetParams, Site>(
  { expose: true, path: "/site/:id", method: "GET" },
  async ({ id }) => {
    const site = await prisma.site.findUnique({
      where: { id },
    });

    if (!site) {
      return Promise.reject(APIError.notFound("Site not found"));
    }
    return site;
  },
);

export interface DelParams {
  id: string;
}

export const del = api<DelParams, void>(
  { expose: true, path: "/site/:id", method: "DELETE" },
  async ({ id }) => {
    await prisma.site.delete({ where: { id } });
  },
);

export interface ListResponse {
  sites: Site[];
}

export const list = api<void, ListResponse>(
  { expose: true, path: "/site", method: "GET" },
  async () => {
    const sites = await prisma.site.findMany();
    return { sites };
  },
);

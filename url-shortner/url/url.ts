import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { randomBytes } from "node:crypto";

const db = new SQLDatabase("url", {
  migrations: "./migrations"
});

interface URL {
  id: string; // short form URL id
  url: string; // full URL
}

interface ShortenParams {
  url: string; // the URL to shorten
}

export const shorten = api(
  { expose: true, method: "POST", path: "/url" },
  async ({ url }: ShortenParams): Promise<URL> => {
    const id = randomBytes(6).toString("base64url");

    await db.exec`
      INSERT INTO url (id, original_url) VALUES(${id}, ${url})
    `;

    return { id, url };
  }
)

// Get a URL by its ID
export const get = api(
  { expose: true, auth: false, method: "GET", path: "/url/:id" },
  async ({ id }: { id: string }): Promise<URL> => {
    const row = await db.queryRow`
      SELECT original_url FROM url WHERE id = ${id}
    `

    if(!row) {
      throw APIError.notFound("URL not found");
    }

    return { id, url: row.original_url };
  })


interface ListResponse {
  urls: URL[];
}

// List all URLs
export const list = api(
  { expose: true, auth: false, method: "GET", path: "/url" },
  async (): Promise<ListResponse> => {
    const rows = db.query`
      SELECT * FROM url
    `

    const urls: URL[] = []
    for await (const row of rows) {
      urls.push({ id: row.id, url: row.original_url });
    }

    return { urls };
  }
)
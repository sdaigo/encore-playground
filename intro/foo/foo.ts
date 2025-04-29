import { api } from "encore.dev/api";
import { hello } from "~encore/clients";

interface Response {
  greeting: string;
}

export const greeting = api(
  { method: "GET", path: "/greeting/:name", expose: true },
  async ({ name }: { name: string }): Promise<Response> => {
    const { message } = await hello.get()

    return { greeting: `${message} ${name}!` };
  }
)
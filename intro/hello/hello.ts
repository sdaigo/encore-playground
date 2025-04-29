import { api } from "encore.dev/api";
import log from "encore.dev/log";
import { getAuthData } from "~encore/auth";

interface Response {
  message: string;
}

export const get = api(
  { method: "GET", path: "/hello", expose: true },
  async (): Promise<Response> => {
    return { message: "Hello!" };
  },
);

export const admin = api(
  { method: "GET", path: "/admin", auth: true, expose: true },
  async (): Promise<Response> => {
    const authData = getAuthData();

    if (!authData) {
      throw new Error("Unauthorized");
    }

    const { userID } = authData;

    log.info("Data requested by user", { userID });

    return { message: "Secret message for admin" };
  },
);

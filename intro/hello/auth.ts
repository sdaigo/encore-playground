import { Gateway, type Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";

interface AuthParams {
  authorization: Header<"Authorization">;
}

interface AuthData {
  userID: string;
}

export const auth = authHandler<AuthParams, AuthData>(async (params) => {
  return { userID: "my-user-id" };
});

export const gateway = new Gateway({
  authHandler: auth,
});

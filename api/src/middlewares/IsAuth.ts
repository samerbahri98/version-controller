import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { IContext } from "../interfaces/IContext";

const IsAuth: MiddlewareFn<IContext> = ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new Error("not authenticated");
  }
  try {
    const token = auth.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
  }
  return next();
};

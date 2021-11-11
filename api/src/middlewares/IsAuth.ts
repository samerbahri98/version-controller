import { MiddlewareFn, NextFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { IContext } from "../interfaces/IContext";
import { AuthenticationError } from "apollo-server-errors";

export const IsAuth: MiddlewareFn<IContext> = ({ context }, next: NextFn) => {
	if (!context.req) throw new Error("no headers");
	const auth = context.req.headers["authorization"];
	if (!auth) {
		throw new AuthenticationError("not authenticated");
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

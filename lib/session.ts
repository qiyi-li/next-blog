import type {IronSessionOptions} from "iron-session";
import {User} from "../src/entity/User";
import {ObjectLiteral} from "typeorm";
export const sessionOptions: IronSessionOptions = {
	// process.env.SECRET_COOKIE_PASSWORD as string,
	password: process.env.SECRET as string,
	cookieName: "blog",
	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
	interface IronSessionData {
		user?: ObjectLiteral | null | undefined;
	}
}

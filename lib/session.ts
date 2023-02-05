import type {IronSessionOptions} from "iron-session";
import {ObjectLiteral} from "typeorm";

export const sessionOptions: IronSessionOptions = {
	// process.env.SECRET_COOKIE_PASSWORD as string,
	password: process.env.NEXT_PUBLIC_SECRET_KEY as string,
	cookieName: "blog",
	cookieOptions: {
		secure: false,
	},
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
	interface IronSessionData {
		user?: ObjectLiteral | null | undefined;
	}
}

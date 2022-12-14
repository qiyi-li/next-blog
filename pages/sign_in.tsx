import {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../lib/session";
import {ObjectLiteral} from "typeorm";
import {useForm} from "../hooks/useForm";

type Props = {
	user: ObjectLiteral
}
const SingIn = (props: Props) => {
	const initFormData = {
		username: "",
		password: ""
	};
	const onSubmit = (formData: typeof initFormData) => {
		axios.post("/api/v1/sessions", formData).then((res) => {
				window.alert("登录成功");
			}
		).catch((err) => {
			if (err.response && err.response.status === 422) {
				setErrors({...err.response.data});
			}
		});
	};

	const {form, setErrors} = useForm({
		initFormData, onSubmit, fields: [
			{
				label: "用户名", type: "text", key: "username",
			},
			{
				label: "密码", type: "password", key: "password",
			}
		],
		buttons: <button type="submit">登录</button>
	});
	return (
		<div>
			<h1>登录</h1>
			{form}
		</div>
	);
};
export default SingIn;
export const getServerSideProps = withIronSessionSsr(async function ({req, res,}) {
		const user = req.session.user;

		if (user === undefined) {
			// res.setHeader("location", "/sign_in");
			// res.statusCode = 302;
			// res.end();
			return {
				props: {
					user: null,
				},
			};
		}

		return {
			props: {user: req.session.user},
		};
	},
	sessionOptions);
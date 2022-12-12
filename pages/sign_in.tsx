import {FormEvent, useCallback, useState} from "react";
import axios from "axios";

const SingIn = () => {
	const [singInData, setSingInData] = useState({
		username: "",
		password: "",
		passwordConfirmation: "",
	});
	const [errors, setErrors] = useState({
			username: [],
			password: [],
		}
	);
	const onSubmit = useCallback(async (e: FormEvent) => {
			e.preventDefault();
		}
		, [singInData]);
	return (
		<div>
			{JSON.stringify(errors)}
			<h1>Sign Up</h1>
			<form action="sign_up" onSubmit={onSubmit}>
				<div>
					<label htmlFor="用户名">
						用户名
						<input type="text" value={singInData.username}
									 onChange={e => setSingInData({...singInData, username: e.target.value})}/>
					</label>
					{errors.username.length > 0 && <div>{errors.username.join(",")}</div>}
				</div>
				<div>
					<label htmlFor="密码">
						密码
						<input type="password" value={singInData.password}
									 onChange={e => setSingInData({...singInData, password: e.target.value})}/>
					</label>
					{errors.password.length > 0 && <div>{errors.password.join(",")}</div>}
				</div>
				<div>
					<button type={"submit"}>登录</button>
				</div>
			</form>
		</div>
	);
};
export default SingIn;
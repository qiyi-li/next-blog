import {FormEvent, useCallback, useState} from "react";
import axios from "axios";

const SingUp = () => {
	const [singUpData, setSingUpData] = useState({
		username: "",
		password: "",
		passwordConfirmation: "",
	});
	const [errors, setErrors] = useState({
			username: [],
			password: [],
			passwordConfirmation: [],
		}
	);
	const onSubmit = useCallback(async (e: FormEvent) => {
			e.preventDefault();
			console.log(singUpData);
			await axios.post("/api/v1/users", singUpData).then((res) => {
				window.alert('注册成功')
				window.location.href = '/sign_in'
			}).catch((err) => {
					if (err.response && err.response.status === 422) {
						setErrors({...errors, ...err.response.data});
						console.log({errors});
					}
				}
			);
		}
		, [singUpData]);
	return (
		<div>
			{JSON.stringify(errors)}
			<h1>Sign Up</h1>
			<form action="sign_up" onSubmit={onSubmit}>
				<div>
					<label htmlFor="用户名">
						用户名
						<input type="text" value={singUpData.username}
									 onChange={e => setSingUpData({...singUpData, username: e.target.value})}/>
					</label>
					{errors.username.length > 0 && <div>{errors.username.join(",")}</div>}
				</div>
				<div>
					<label htmlFor="密码">
						密码
						<input type="password" value={singUpData.password}
									 onChange={e => setSingUpData({...singUpData, password: e.target.value})}/>
					</label>
					{errors.password.length > 0 && <div>{errors.password.join(",")}</div>}
				</div>
				<div>
					<label htmlFor="确认密码">
						确认密码
						<input type="password" value={singUpData.passwordConfirmation}
									 onChange={e => setSingUpData({...singUpData, passwordConfirmation: e.target.value})}/>
					</label>
					{errors.passwordConfirmation.length > 0 && <div>{errors.passwordConfirmation.join(",")}</div>}
				</div>
				<div>
					<button type={"submit"}>注册</button>
				</div>
			</form>
		</div>
	);
};
export default SingUp;
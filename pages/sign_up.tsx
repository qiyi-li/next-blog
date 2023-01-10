import axios from "axios";
import {useForm} from "../hooks/useForm";

const SingUp = () => {
	const {form} = useForm({
		initFormData: {username: "", password: "", passwordConfirmation: ""},
		fields: [
			{
				label: "用户名", type: "text", key: "username",
			},
			{
				label: "密码", type: "password", key: "password",
			},
			{
				label: "确认密码", type: "password", key: "passwordConfirmation",
			}
		],
		submit: {
			request: formData => axios.post("/api/v1/users", formData),
			success: ()=> window.alert("注册成功")
		},
		buttons: <button type="submit">注册</button>
	});
	return (
		<div>
			<h1>Sign Up</h1>
			{form}
		</div>
	);
};
export default SingUp;
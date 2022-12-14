import axios from "axios";
import {useForm} from "../hooks/useForm";

const SingUp = () => {
	const initFormData = {
		username: "",
		password: "",
		passwordConfirmation: ""
	};
	const onSubmit = (formData: typeof initFormData) => {
		axios.post("/api/v1/users", formData).then((res) => {
			window.alert("注册成功");
			window.location.href = "/sign_in";
		}).catch((err) => {
				if (err.response && err.response.status === 422) {
					setErrors({...err.response.data});
				}
			}
		);
	};
	const {form, setErrors} = useForm({
		initFormData, onSubmit, fields: [
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
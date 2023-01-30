import axios from "axios";
import {useForm} from "../hooks/useForm";
import Layout from '../components/layout/layout';

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
			success: ()=> {
				window.location.href="/sign_in"
				window.alert('注册成功');
			}
		},
		centered: true,
		buttons: <button type="submit">注册</button>
	});
	return (
		<Layout home={false} centered={true} header={<h1>注册</h1>}>
			{form}
		</Layout>
	);
};
export default SingUp;

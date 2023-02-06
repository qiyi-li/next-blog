import axios from "axios";
import {useForm} from "../hooks/useForm";
import Layout from '../components/layout/layout';
import {useRouter} from 'next/router';

const SingUp = () => {
	const router = useRouter()
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
			success: async()=> {
				window.alert('注册成功');
				await router.push('/sign_in')
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

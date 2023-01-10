import axios from "axios";
import {useForm} from "../../hooks/useForm";
import {NextPage} from "next";

const PostsNew: NextPage = () => {
	const {form} = useForm({
		initFormData: {title: "", content: ""},
		fields: [
			{label: "标题", type: "text", key: "title",},
			{label: "内容", type: "textarea", key: "content",},
		],
		buttons: <button type="submit">提交</button>,
		submit: {
			request: formData => axios.post(`/api/v1/posts`, formData),
			success:()=>window.alert( "提交成功")
		}
	});
	return (
		<div>
			{form}
		</div>
	);
};
export default PostsNew;
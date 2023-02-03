import {withIronSessionSsr} from "iron-session/next";
import {GetServerSideProps} from "next";
import {sessionOptions} from "../../../lib/session";
import {AppDataSource} from "../../../src/data-source";
import qs from "querystring";
import Layout from "../../../components/layout/layout";
import axios from "axios";
import {useForm} from "../../../hooks/useForm";
import utilStyle from "styles/utils.module.scss";
import {Post} from "../../../src/entity/Post";
import {User} from "../../../src/entity/User";
import {useRouter} from 'next/router';

type Props = {
	post: Post,
	user: User | null
}
export default function PostEdit(props: Props) {
	const {post} = props;
	const router = useRouter()
	const {form} = useForm({
		showBack: true,
		initFormData: {title: post.title, content: post.content},
		fields: [
			{label: "标题：", type: "text", key: "title",},
			{label: "内容：", type: "textarea", key: "content",},
		],
		buttons: <button type="submit" className={utilStyle.submit}>提交</button>,
		submit: {
			request: formData => axios.patch(`/api/v1/posts/`, {...formData, id: post.id}),
			success: async() => {
				window.alert("修改成功");
				await router.push('/post')
			}
		},
		displayPreview: true,
	});
	return (
		<div>
			<Layout home={false}>
				{form}
			</Layout>
		</div>
	);
}
export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({req}) => {
	if (!AppDataSource.isInitialized) await AppDataSource.initialize();
	const postRepository = AppDataSource.getRepository("Post");
	const index = req.url?.indexOf("?");
	let id;
	if (index && req.url) {
		const query = qs.parse(req.url.slice(index + 1));
		id = query.id;
	}
	const post = await postRepository.findOne({where: {id}, relations: ["author"]});
	return {
		props: {
			post: JSON.parse(JSON.stringify(post)),
			user: req.session.user || null
		}
	};
}, sessionOptions);

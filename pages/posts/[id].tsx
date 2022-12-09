import React from "react";
import {NextPage, GetServerSideProps, GetServerSidePropsContext} from "next";
import {Post} from "../../src/entity/Post";
import {AppDataSource} from "../../src/data-source";

type Props = {
	post: Post
}
const PostPage: NextPage<Props> = (props) => {
	const {post} = props;
	return (
		<div>
			<h1>{post.title}</h1>
			<article>{post.content}</article>
		</div>
	);
};
export default PostPage;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context: GetServerSidePropsContext) => {
	if (!AppDataSource.isInitialized) await AppDataSource.initialize();
	const postRepository = AppDataSource.getRepository("Post");
	const id = context.query.id;
	const post = await postRepository.find({where: {id}});
	return {
		props: {
			post: JSON.parse(JSON.stringify(post[0]))
		}
	};
};
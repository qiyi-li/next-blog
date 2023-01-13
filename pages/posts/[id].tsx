import React from "react";
import {NextPage, GetServerSideProps, GetServerSidePropsContext} from "next";
import {Post} from "../../src/entity/Post";
import {AppDataSource} from "../../src/data-source";
import Layout from "../../components/layout/layout";
import Head from "next/head";
import {marked} from "marked";
import style from "./posts.module.sass";
import utilStyles from "styles/utils.module.scss";
import Link from "next/link";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../../lib/session";
import {User} from "../../src/entity/User";

type Props = {
	post: Post,
	user: User | null
}
const PostPage: NextPage<Props> = (props) => {
	const {post,user} = props;
	return (
		<Layout home={false} title={post.title} backLink={"/posts"}
						header={
							<div className={style.titleWrapper}>
								<span></span>
								<h2 className={utilStyles.headingLg}>{post.title}</h2>
								{user ? <Link className={style.newButton} href={`/posts/${post.id}/edit`}>编辑</Link> : <span></span>}
							</div>
						}
						backInfo={"文章列表"}>
			<Head>
				<title>{post.title}</title>
			</Head>
			<article dangerouslySetInnerHTML={{__html: post.content ? marked.parse(post.content) : ""}}
							 className={`markdown-body ${style.article}`}>
			</article>
		</Layout>
	);
};
export default PostPage;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withIronSessionSsr(async (context: GetServerSidePropsContext) => {
	if (!AppDataSource.isInitialized) await AppDataSource.initialize();
	const user = context.req.session.user || null;
	const postRepository = AppDataSource.getRepository("Post");
	const id = context.query.id;
	const post = await postRepository.find({where: {id}});
	return {
		props: {
			post: JSON.parse(JSON.stringify(post[0])),
			user
		}
	};
}, sessionOptions);
import Head from "next/head";
import utilStyles from "styles/utils.module.scss";
import Layout, {siteTitle} from "components/layout/layout";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {AppDataSource} from "../../src/data-source";
import {Post} from "../../src/entity/Post";
import "reflect-metadata";

type Props = {
	posts: Post[]
}
export default function PostsIndex(props: Props) {
	const {posts} = props;
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>[Your Self Introduction]</p>
				{posts.map(post => (
					<div key={post.id}>
						<Link href={`/posts/${post.id}`}>
							{post.title}
						</Link>
					</div>
				))}
			</section>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (contesxt) => {
	if (!AppDataSource.isInitialized) await AppDataSource.initialize();
	const postRepository = AppDataSource.getRepository("Post");
	return {
		props: {
			posts: JSON.parse(JSON.stringify(await postRepository.find()))
		}
	};
};
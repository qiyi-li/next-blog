import Head from "next/head";
import utilStyles from "styles/utils.module.scss";
import Layout, {siteTitle} from "components/layout/layout";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {AppDataSource} from "../src/data-source";
import {Post} from "../src/entity/Post";
import "reflect-metadata";

type Props = {
	posts: Post[]
}
export default function Home(props: Props) {
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
				{/*<Link href={"/posts/first-post"}>first</Link>*/}
				<p>
					(This is a sample website - you’ll be building a site like this on{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
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
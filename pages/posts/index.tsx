import Head from "next/head";
import utilStyles from "styles/utils.module.scss";
import Layout, {siteTitle} from "components/layout/layout";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {AppDataSource} from "../../src/data-source";
import {Post} from "../../src/entity/Post";
import "reflect-metadata";
import qs from "querystring";

type Props = {
	posts: Post[],
	count: number,
	num: number
	page: number,
	totalPage: number
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
			<footer>
				共{props.count}篇文章，当前第{props.page}/{props.totalPage}页
				{props.page !== 1 && <Link href={`?page=${props.page - 1}`}>上一页</Link>}
				{props.page < props.totalPage && <Link href={`?page=${props.page + 1}`}>下一页</Link>}
			</footer>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
	if (!AppDataSource.isInitialized) await AppDataSource.initialize();
	const postRepository = AppDataSource.getRepository("Post");
	const index = req.url?.indexOf("?");
	const pager = {take: 10, skip: 0};
	let page = 1;

	if (index && req.url) {
		const query = qs.parse(req.url.slice(index + 1));
		page = parseInt(query.page?.toString() || "1");
		if (query.page) pager.skip = (page - 1) * pager.take;
	}
	const posts = await postRepository.findAndCount({...pager, order: {updatedAt: "DESC"}});
	return {
		props: {
			posts: JSON.parse(JSON.stringify(posts[0])),
			count: posts[1],
			num: pager.take,
			page,
			totalPage: Math.ceil(posts[1] / pager.take)

		}
	};
};
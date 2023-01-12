import Head from "next/head";
import utilStyles from "styles/utils.module.scss";
import Layout, {siteTitle} from "components/layout/layout";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {AppDataSource} from "../../src/data-source";
import {Post} from "../../src/entity/Post";
import "reflect-metadata";
import qs from "querystring";
import {usePager} from "../../hooks/usePager";

type Props = {
	posts: Post[],
	count: number,
	num: number
	page: number,
	totalPage: number
}
export default function PostsIndex(props: Props) {
	const {posts} = props;
	const urlMaker = (page: number) => {
		return `?page=${page}`;
	};
	const {count, page, totalPage} = props;
	const {pager} = usePager({count, page, totalPage, url: urlMaker});
	return (
		<div>
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
					{pager}
				</footer>
			</Layout>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
	if (!AppDataSource.isInitialized) await AppDataSource.initialize();
	const postRepository = AppDataSource.getRepository("Post");
	const index = req.url?.indexOf("?");
	const pager = {take: 1, skip: 0};
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
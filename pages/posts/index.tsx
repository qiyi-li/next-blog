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
import style from "./posts.module.sass";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../../lib/session";
import {User} from "../../src/entity/User";

type Props = {
	posts: Post[],
	count: number,
	num: number
	page: number,
	totalPage: number,
	user: User | null
}
export default function PostsIndex(props: Props) {
	const {posts, count, page, totalPage, user} = props;
	console.log({user});
	const urlMaker = (page: number) => {
		return `?page=${page}`;
	};
	const {pager} = usePager({count, page, totalPage, url: urlMaker});
	return (
		<div>
			{/*// @ts-ignore*/}
			<Layout title={"文章列表"} header={
				<div className={style.titleWrapper}>
					<span></span>
					<h2 className={utilStyles.headingLg}>
						文章列表
					</h2>
					{user ? <Link href={"/posts/new"} className={style.newButton}>新建</Link> : <span></span>}
				</div>
			} backLink={"/"} backInfo={"返回首页"} displayNewButton={true}>
				<Head>
					<title>{siteTitle}</title>
				</Head>
				<section className={utilStyles.headingMd}>
					<main className={style.main}>
						{posts.map(post => (
							<div key={post.id} className={style.postItem}>
								<Link href={`/posts/${post.id}`}>
									{post.title}
								</Link>
							</div>
						))}
					</main>
				</section>
				<footer className={style.footer}>
					{pager}
				</footer>
			</Layout>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({req}) => {
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
			totalPage: Math.ceil(posts[1] / pager.take),
			user: req.session.user || null

		}
	};
}, sessionOptions);
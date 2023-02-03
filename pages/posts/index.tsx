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
import {useEffect, useRef, useState} from "react";
import cs from "classnames";
import axios from "axios";

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
	const urlMaker = (page: number) => {
		return `?page=${page}`;
	};

	const timer = useRef<number | null>(null);
	const [hoverPostId, setHoverPostId] = useState<string | null>(null);

	const onDelete = (id: string) => {
		if (confirm("确定删除吗？")) {
			axios.delete(`/api/v1/posts`, {data: {id}}).then(() => {
				window.alert("删除成功");
				window.location.reload();
			}, (res) => {
				window.alert(res.response.data);
			});
		}
	};

	useEffect(() => {
		const elements = document.querySelectorAll(".post-item");

		elements.forEach(e => {
			const eleId = e.getAttribute("id");

			e.addEventListener("mouseenter", () => {
				window.clearTimeout(timer.current!);
				timer.current = window.setTimeout(() => {
					if (timer.current) {
						window.clearTimeout(timer.current!);
						setHoverPostId(eleId);
					}
				}, 1000);
			});

			e.addEventListener("mouseleave", (e) => {
				window.clearTimeout(timer.current!);
				timer.current = null;
				setHoverPostId(null);
			});

		});
	}, []);


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
							<div key={post.id} id={post.id?.toString()} className={cs(style.postItem, "post-item")}>
								<Link href={`/posts/${post.id}`}>
									{post.title}
									<span>{post.author?.username}</span>
								</Link>
								{hoverPostId === post.id?.toString() && user?.id === post?.author?.id &&
                  <span key={post.id} className={style.delete}
                        onClick={onDelete.bind(null, post.id?.toString())}>删除</span>}

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

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async function getServerSideProps ({req}) {
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
	const posts = await postRepository.findAndCount({...pager, order: {updatedAt: "DESC"}, relations: ["author"]});
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
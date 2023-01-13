import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.sass";
import utilStyles from "styles/utils.module.scss";
import Link from "next/link";
import head1 from "assets/images/head-1.jpg";
import React, {ReactNode} from "react";


export const siteTitle = "个人博客";
type Options = {
	children: React.ReactNode,
	home?: boolean
	title?: string,
	backLink?: string,
	backInfo?: string,
	displayNewButton?: boolean,
	header?: ReactNode,
	userName?: string
}
const Layout = (options: Options) => {
	const {children, home, header, backLink, backInfo, displayNewButton,userName} = options;
	return <div className={styles.container}>
		<Head>
			<link rel="icon" href="/favicon.ico"/>
			<meta
				name="description"
				content="Learn how to build a personal website using Next.js"
			/>
			<meta
				property="og:image"
				content={`https://og-image.vercel.app/${encodeURI(
					siteTitle,
				)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
			/>
			<meta name="og:title" content={siteTitle}/>
			<title>{siteTitle}</title>
			<meta name="twitter:card" content="summary_large_image"/>
		</Head>
		<header className={styles.header}>
			{home ? (
				<>
					<Image
						priority
						src={head1}
						className={utilStyles.borderCircle}
						height={144}
						width={144}
						alt=""
					/>
					<h1 className={utilStyles.heading2Xl}>
						{userName}
					</h1>
				</>
			) : (
				<>
					{header}
				</>
			)}
		</header>
		<main className={home ? styles.homeMain : ""}>{children}</main>
		{!home && (
			<div className={styles.backToHome}>
				<Link href={backLink || "/"}>
					{backInfo}
				</Link>
			</div>
		)}
	</div>;
};
export default Layout;
import {NextPage} from "next";
import Link from "next/link";
import utilStyles from "styles/utils.module.scss";
import Layout from "../components/layout/layout";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../lib/session";
import {User} from "../src/entity/User";

type Props = {
	user: User
}
const Home: NextPage<Props> = (props) => {
	console.log(props.user);
	return (
		<div>
			<Layout home userName={props.user.username}>
				<section className={utilStyles.headingMd}>
					<p>此项目是一个基于 Next.js 与 typeorm 开发的ssr项目</p>
				</section>
				<footer>
					<Link href={"/posts"}>文章列表</Link>
				</footer>
			</Layout>
		</div>
	);
};
export default Home;
export const getServerSideProps = withIronSessionSsr(async function ({req, res,}) {
		const user = req.session.user;
		if (user === undefined) {
			// res.setHeader("location", "/sign_in");
			// res.statusCode = 302;
			// res.end();
			return {
				props: {
					user: null,
				},
			};
		}

		return {
			props: {user: req.session.user},
		};
	},
	sessionOptions);
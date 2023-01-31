import {NextApiHandler} from "next";
import {Post} from "../../../src/entity/Post";
import {sessionOptions} from "lib/session";
import {withIronSessionApiRoute} from "iron-session/next";
import {AppDataSource} from "../../../src/data-source";
import {emptyValidate} from "../../../lib/helper";

const Posts: NextApiHandler = async (req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-type", "application/json");
	if (req.method === "POST") {
		const {title, content} = req.body;
		const [hasError, errors] = emptyValidate({title, content});
		if(hasError) {
			res.statusCode = 422;
			res.write(JSON.stringify({errors}));
			res.end();
			return;
		}
		const post = new Post();
		post.title = title;
		post.content = content;
		const user = req.session?.user;
		if (!user) {
			res.statusCode = 401;
			res.end();
			return;
		}
		if (!AppDataSource.isInitialized) await AppDataSource.initialize();
		const postRepository = AppDataSource.getRepository("Post");
		// @ts-ignore
		post.author = user;
		const p = await postRepository.save(post);
		res.json(p);
	}
	if (req.method === "DELETE") {
		const {id} = req.body;
		if (!id) {
			res.statusCode = 400;
			res.end();
			return;
		}
		if (!AppDataSource.isInitialized) await AppDataSource.initialize();
		const postRepository = AppDataSource.getRepository("Post");
		const post = await postRepository.findOne({where: {id}, relations: ["author"]});
		if (!post) {
			res.statusCode = 404;
			res.write("未找到对应文章");
			res.end();
			return;
		}
		const user = req.session?.user;
		if (!user) {
			res.statusCode = 401;
			res.write("请先登录");
			res.end();
			return;
		}
		if (post.author && post.author.id !== user.id) {
			res.statusCode = 403;
			res.write("无权删除");
			res.end();
			return;
		}
		await postRepository.remove(post);
		res.statusCode = 200;
		res.end();
	}
	if (req.method === "PATCH") {
		const {title, content, id} = req.body;
		if (!id) {
			res.statusCode = 400;
			res.end("未找到对应文章");
			return;
		}
		if (!AppDataSource.isInitialized) await AppDataSource.initialize();
		const postRepository = AppDataSource.getRepository("Post");
		const post = await postRepository.findOne({where: {id}, relations: ["author"]});
		if (!post) {
			res.statusCode = 404;
			res.write("未找到对应文章");
			res.end();
			return;
		}
		const user = req.session?.user;
		if (!user) {
			res.statusCode = 401;
			res.write("请先登录");
			res.end();
			return;
		}
		if (post.author && post.author.id !== user.id) {
			res.statusCode = 403;
			res.write("无权修改");
			res.end();
			return;
		}
		post.title = title;
		post.content = content;
		await postRepository.save(post);
		res.statusCode = 200;
		res.end();
	}
};
export default withIronSessionApiRoute(Posts, sessionOptions);

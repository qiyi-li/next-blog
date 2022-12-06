import {NextApiHandler} from "next";

const Posts: NextApiHandler = (req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-type", "application/json");
	res.write(JSON.stringify({name: "123123123"}));
	res.end();
};
export default Posts;
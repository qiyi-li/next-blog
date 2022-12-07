import {AppDataSource} from "./data-source";
import {Post} from "./entity/Post";

AppDataSource.initialize().then(async (connection) => {
	const posts = await connection.manager.find(Post);
	console.log({posts});
	if (posts.length === 0) {
		for (let i = 0; i < 10; i++) {
			const p = new Post({title: "Post1" + i, content: `第1${i}篇文章`});
			await connection.manager.save(p);
		}
	}
	console.log(await connection.manager.find(Post));
	await connection.destroy();
}).catch(error => console.log(error));

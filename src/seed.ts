import {AppDataSource} from "./data-source";
import {Post} from "./entity/Post";
import {User} from "./entity/User";
import {Comment} from "./entity/Comment";

AppDataSource.initialize().then(async (connection) => {
	const manager = connection.manager;
	// 创建user1
	const u1 = new User()
	u1.username = "u1"
	u1.passwordDigest = "xxx"
	await manager.save(u1)

	const p1 = new Post()
	p1.title = "p1"
	p1.content = "xxx"
	p1.author = u1
	await manager.save(p1)

	//add comments
	const c1 = new Comment()
	c1.content = "c1"
	c1.user = u1
	c1.post = p1
	await manager.save(c1)

}).catch(error => console.log(error));

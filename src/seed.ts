import {AppDataSource} from "./data-source";
import {Post} from "./entity/Post";
import {User} from "./entity/User";

AppDataSource.initialize().then(async (connection) => {
	const manager = connection.manager;
	const u1 = new User()
	u1.username = "u1"
	u1.passwordDigest = "xxx"
	await manager.save(u1)
	console.log(u1);

}).catch(error => console.log(error));

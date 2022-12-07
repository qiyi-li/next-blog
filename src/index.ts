import { AppDataSource } from "./data-source"
import {Post} from "./entity/Post";

AppDataSource.initialize().then(async (connection) => {
    const posts = await connection.manager.find(Post)
    console.log({posts});
    const p = new Post()
    p.title = '123123'
    p.content = '11111'
    await connection.manager.save(p)
    console.log(await connection.manager.find(Post));
    await connection.destroy()
}).catch(error => console.log(error))

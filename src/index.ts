import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async (aaa) => {
    console.log({aaa});


}).catch(error => console.log(error))

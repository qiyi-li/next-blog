import {AppDataSource} from "../data-source";
import md5 from "md5";
import {User} from "../entity/User";
import {ObjectLiteral} from "typeorm";

export class SignIn {
	username: string | undefined;
	password: string | undefined;
	errors = {
		username: [] as string[],
		password: [] as string[],
	};
	user: ObjectLiteral | null | undefined;

	async validate() {
		if (this.username?.trim() === "") {
			this.errors.username.push("请填写用户名");
		}
		if (!AppDataSource.isInitialized) await AppDataSource.initialize();
		const userRepository = AppDataSource.getRepository("User");
		const user = await userRepository.findOne({where: {username: this.username}});
		this.user = user;
		if (!this.password) {
			this.errors.password.push("请填写密码");
		} else if (!user) {
			this.errors.username.push("用户名不存在");
		} else if (user.passwordDigest !== md5(this.password)) {
			this.errors.password.push("密码错误");
		}
	}

	hasErrors() {
		return !!Object.values(this.errors).find(v => v.length > 0);
	}
}
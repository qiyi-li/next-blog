import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {AppDataSource} from "../data-source";
import md5 from "md5";
import _ from 'lodash'

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number | undefined;
	@Column("varchar")
	username: string | undefined;
	@Column("varchar")
	passwordDigest: string | undefined;
	@CreateDateColumn({type: "timestamp"})
	createdAt: Date | undefined;
	@UpdateDateColumn({type: "timestamp"})
	updatedAt: Date | undefined;

	@OneToMany(type => Post, post => post.author)
	posts: Post[] | undefined;

	@OneToMany(type => Comment, comment => comment.user)
	comments: Comment[] | undefined;

	password: string | undefined;
	passwordConfirmation: string | undefined;

	errors = {
		username: [] as string[],
		password: [] as string[],
		passwordConfirmation: [] as string[]
	};

	async validate() {

		// @ts-ignore
		if (this.username.trim() === "") {
			this.errors.username.push("不能为空");
		}
		// @ts-ignore
		if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
			this.errors.username.push("格式不合法");
		}
		// @ts-ignore
		if (this.username.trim().length > 42) {
			this.errors.username.push("太长");
		}
		// @ts-ignore
		if (this.username.trim().length <= 3) {
			this.errors.username.push("太短");
		}
		if (this.password === "") {
			this.errors.password.push("不能为空");
		}
		if (this.password !== this.passwordConfirmation) {
			this.errors.passwordConfirmation.push("密码不匹配");
		}

		if (!AppDataSource.isInitialized) await AppDataSource.initialize();
		const userRepository = AppDataSource.getRepository("User");
		const hasUser = await userRepository.findOne({where: {username: this.username}});
		if (hasUser) {
			this.errors.username.push("用户名已存在");
		}
	}

	hasErrors() {
		return [!!Object.values(this.errors).find(v => v.length > 0), this.errors];
	}

	@BeforeInsert()
	generatePasswordDigest() {
		this.passwordDigest = md5(this.password||'');
	}

	toJSON(){
		return _.omit(this,['password','passwordConfirmation','passwordDigest','errors'])
	}
}

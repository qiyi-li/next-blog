import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";

@Entity()
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number | undefined;
	@Column("varchar", {length: 100})
	username: string | undefined;
	@Column("varchar", {length: 100})
	passwordDigest: string | undefined;
	@CreateDateColumn("time")
	createdAt: Date | undefined;
	@UpdateDateColumn("time")
	updatedAt: Date | undefined;

	@OneToMany(type => Post, post => post.author)
	posts: Post[] | undefined;

	@OneToMany(type => Comment, comment => comment.user)
	comments: Comment[] | undefined;
}

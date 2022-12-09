import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number | undefined;
	@Column("varchar")
	username: string | undefined;
	@Column("varchar")
	passwordDigest: string | undefined;
	@CreateDateColumn({type:"timestamp"})
	createdAt: Date | undefined;
	@UpdateDateColumn({type:"timestamp"})
	updatedAt: Date | undefined;

	@OneToMany(type => Post, post => post.author)
	posts: Post[] | undefined;

	@OneToMany(type => Comment, comment => comment.user)
	comments: Comment[] | undefined;
}

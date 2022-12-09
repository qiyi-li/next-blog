import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn("increment")
	id: number | undefined;
	@Column("varchar")
	content: string | undefined;
	@CreateDateColumn("time")
	createdAt: Date | undefined;
	@UpdateDateColumn("time")
	updatedAt: Date | undefined;
	@ManyToOne(type => User, user => user.comments)
	user: User | undefined;

	@ManyToOne(type => Post, post => post.comments)
	post: Post | undefined;
}

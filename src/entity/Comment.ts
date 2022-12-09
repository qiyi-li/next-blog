import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity("comments")
export class Comment {
	@PrimaryGeneratedColumn("increment")
	id: number | undefined;
	@Column("varchar")
	content: string | undefined;
	@CreateDateColumn({type:"timestamp"})
	createdAt: Date | undefined;
	@UpdateDateColumn({type:"timestamp"})
	updatedAt: Date | undefined;
	@ManyToOne(type => User, user => user.comments)
	user: User | undefined;

	@ManyToOne(type => Post, post => post.comments)
	post: Post | undefined;
}

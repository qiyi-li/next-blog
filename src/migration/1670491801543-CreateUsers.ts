import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1670491801543 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "users",
			columns: [
				{name: "id", isGenerated: true, type: "int", generationStrategy: "increment", isPrimary: true},
				{name: "username", type: "varchar"},
				{name: "passwordDigest", type: "varchar"}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users')
	}

}

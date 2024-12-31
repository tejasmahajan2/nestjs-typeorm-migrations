import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735649295524 implements MigrationInterface {
    name = 'Migration1735649295524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL DEFAULT 'test@gmail.com'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL DEFAULT 'test'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}

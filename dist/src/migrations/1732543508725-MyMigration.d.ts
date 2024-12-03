import { MigrationInterface, QueryRunner } from "typeorm";
export declare class MyMigration1732543508725 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSmartMeterTable1655029903794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE smart_meters (
                id UUID PRIMARY KEY NOT NULL,
                active BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMP NOT NULL DEFAULT NOW())
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE smart_meters;
        `)
    }

}

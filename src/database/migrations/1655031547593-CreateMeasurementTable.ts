import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMeasurementTable1655031547593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE measurements (
                id UUID PRIMARY KEY NOT NULL,
                muid UUID NOT NULL,
                measurement VARCHAR NOT NULL,
                "0100011D00FF" REAL NOT NULL,
                "0100021D00FF" REAL NOT NULL,
                timestamp TIMESTAMP NOT NULL,
                CONSTRAINT fk_measurements_smart_meters 
                    FOREIGN KEY (muid) 
                        REFERENCES smart_meters (id) ON DELETE CASCADE
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE measurements;`
            );
  }
}

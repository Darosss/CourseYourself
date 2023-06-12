import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedByToWorkout1686477081348 implements MigrationInterface {
  name = 'AddCreatedByToWorkout1686477081348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`workouts\` ADD \`createdById\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workouts\` ADD CONSTRAINT \`FK_f90c036e8e7359876897ca52cc1\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`workouts\` DROP FOREIGN KEY \`FK_f90c036e8e7359876897ca52cc1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`workouts\` DROP COLUMN \`createdById\``,
    );
  }
}

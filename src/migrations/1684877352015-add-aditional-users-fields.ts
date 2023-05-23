import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAditionalUsersFields1684877352015
  implements MigrationInterface
{
  name = 'AddAditionalUsersFields1684877352015';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`createdDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`updatedDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`age\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`gender\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`fitnessLevel\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`workoutPreferences\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`workoutPreferences\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`fitnessLevel\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`age\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`updatedDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`createdDate\``,
    );
  }
}

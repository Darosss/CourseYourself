import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsAdminToUser1686335991025 implements MigrationInterface {
  name = 'AddIsAdminToUser1686335991025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isAdmin\``);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTablePasswordNotNull1685262647577
  implements MigrationInterface
{
  name = 'UserTablePasswordNotNull1685262647577';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
  }
}

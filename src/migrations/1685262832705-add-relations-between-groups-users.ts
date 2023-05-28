import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenGroupsUsers1685262832705
  implements MigrationInterface
{
  name = 'AddRelationsBetweenGroupsUsers1685262832705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_groups_users_users\` DROP FOREIGN KEY \`FK_f0b47fb5c27a55571950b280e5a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups_users_users\` ADD CONSTRAINT \`FK_f0b47fb5c27a55571950b280e5a\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_groups_users_users\` DROP FOREIGN KEY \`FK_f0b47fb5c27a55571950b280e5a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_groups_users_users\` ADD CONSTRAINT \`FK_f0b47fb5c27a55571950b280e5a\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}

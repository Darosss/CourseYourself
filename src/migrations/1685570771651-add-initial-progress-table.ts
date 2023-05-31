import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitialProgressTable1685570771651
  implements MigrationInterface
{
  name = 'AddInitialProgressTable1685570771651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`progresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`workoutExercises\` json NOT NULL, \`createdDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`workoutId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`progresses\` ADD CONSTRAINT \`FK_950033957a2c11dc001615840af\` FOREIGN KEY (\`workoutId\`) REFERENCES \`workouts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`progresses\` ADD CONSTRAINT \`FK_53521976154b5eca84f568ecee1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`progresses\` DROP FOREIGN KEY \`FK_53521976154b5eca84f568ecee1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`progresses\` DROP FOREIGN KEY \`FK_950033957a2c11dc001615840af\``,
    );
    await queryRunner.query(`DROP TABLE \`progresses\``);
  }
}

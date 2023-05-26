import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkoutExercisesRelations1685009358139
  implements MigrationInterface
{
  name = 'WorkoutExercisesRelations1685009358139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`workouts_exercises_exercises\` (\`workoutsId\` int NOT NULL, \`exercisesId\` int NOT NULL, INDEX \`IDX_bfc966116a382a6f6b845ac15d\` (\`workoutsId\`), INDEX \`IDX_13937e69e8ba290d5faafcec75\` (\`exercisesId\`), PRIMARY KEY (\`workoutsId\`, \`exercisesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workouts\` DROP COLUMN \`exercises\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`workouts_exercises_exercises\` ADD CONSTRAINT \`FK_bfc966116a382a6f6b845ac15db\` FOREIGN KEY (\`workoutsId\`) REFERENCES \`workouts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workouts_exercises_exercises\` ADD CONSTRAINT \`FK_13937e69e8ba290d5faafcec751\` FOREIGN KEY (\`exercisesId\`) REFERENCES \`exercises\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`workouts_exercises_exercises\` DROP FOREIGN KEY \`FK_13937e69e8ba290d5faafcec751\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`workouts_exercises_exercises\` DROP FOREIGN KEY \`FK_bfc966116a382a6f6b845ac15db\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`workouts\` ADD \`exercises\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_13937e69e8ba290d5faafcec75\` ON \`workouts_exercises_exercises\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bfc966116a382a6f6b845ac15d\` ON \`workouts_exercises_exercises\``,
    );
    await queryRunner.query(`DROP TABLE \`workouts_exercises_exercises\``);
  }
}

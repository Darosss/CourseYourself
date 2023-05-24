import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialWorkoutTable1684965223935 implements MigrationInterface {
    name = 'AddInitialWorkoutTable1684965223935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`workouts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`scheduledDate\` timestamp NOT NULL, \`completed\` tinyint NOT NULL, \`exercises\` varchar(255) NOT NULL, \`status\` enum ('done', 'missed', 'scheduled') NOT NULL DEFAULT 'scheduled', \`repeat\` tinyint NOT NULL DEFAULT 1, \`repeatFrequency\` enum ('daily', 'weekly', 'monthly', 'custom') NOT NULL DEFAULT 'daily', \`repeatDays\` text NOT NULL, \`createdDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_f610bb716b9281f07dd9c11d9f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f610bb716b9281f07dd9c11d9f\` ON \`workouts\``);
        await queryRunner.query(`DROP TABLE \`workouts\``);
    }

}

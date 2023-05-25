import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitExerciseTable1685007449910 implements MigrationInterface {
    name = 'AddInitExerciseTable1685007449910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exercises\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`videoUrl\` varchar(255) NULL, \`muscleGroup\` text NOT NULL, \`requiredEquipment\` text NULL, \`difficultyLevel\` enum ('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'intermediate', \`createdDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a521b5cac5648eedc036e17d1b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a521b5cac5648eedc036e17d1b\` ON \`exercises\``);
        await queryRunner.query(`DROP TABLE \`exercises\``);
    }

}

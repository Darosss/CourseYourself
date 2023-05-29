import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialNotificationTable1685369625857 implements MigrationInterface {
    name = 'AddInitialNotificationTable1685369625857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`type\` enum ('reminder', 'alert', 'achievement', 'system', 'progress') NOT NULL DEFAULT 'alert', \`timestamp\` timestamp NULL, \`createdDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notifications_users_users\` (\`notificationsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_9a993900ff133379818b377be9\` (\`notificationsId\`), INDEX \`IDX_43985406f387ccdd9ab84bee24\` (\`usersId\`), PRIMARY KEY (\`notificationsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_fcce8c50a375466676d82dcbadd\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications_users_users\` ADD CONSTRAINT \`FK_9a993900ff133379818b377be96\` FOREIGN KEY (\`notificationsId\`) REFERENCES \`notifications\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`notifications_users_users\` ADD CONSTRAINT \`FK_43985406f387ccdd9ab84bee24f\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications_users_users\` DROP FOREIGN KEY \`FK_43985406f387ccdd9ab84bee24f\``);
        await queryRunner.query(`ALTER TABLE \`notifications_users_users\` DROP FOREIGN KEY \`FK_9a993900ff133379818b377be96\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_fcce8c50a375466676d82dcbadd\``);
        await queryRunner.query(`DROP INDEX \`IDX_43985406f387ccdd9ab84bee24\` ON \`notifications_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a993900ff133379818b377be9\` ON \`notifications_users_users\``);
        await queryRunner.query(`DROP TABLE \`notifications_users_users\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}

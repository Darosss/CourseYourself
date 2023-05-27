import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitUsersgroupTable1685215536709 implements MigrationInterface {
    name = 'AddInitUsersgroupTable1685215536709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usersGroups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` int NULL, UNIQUE INDEX \`IDX_1d8775e0b22281de858b8a0062\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_groups_users_users\` (\`usersGroupsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_35c94c977f22e838d78cadbe7d\` (\`usersGroupsId\`), INDEX \`IDX_f0b47fb5c27a55571950b280e5\` (\`usersId\`), PRIMARY KEY (\`usersGroupsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usersGroups\` ADD CONSTRAINT \`FK_a34912f66cef015b79b1d1c1933\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_groups_users_users\` ADD CONSTRAINT \`FK_35c94c977f22e838d78cadbe7dd\` FOREIGN KEY (\`usersGroupsId\`) REFERENCES \`usersGroups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_groups_users_users\` ADD CONSTRAINT \`FK_f0b47fb5c27a55571950b280e5a\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_groups_users_users\` DROP FOREIGN KEY \`FK_f0b47fb5c27a55571950b280e5a\``);
        await queryRunner.query(`ALTER TABLE \`users_groups_users_users\` DROP FOREIGN KEY \`FK_35c94c977f22e838d78cadbe7dd\``);
        await queryRunner.query(`ALTER TABLE \`usersGroups\` DROP FOREIGN KEY \`FK_a34912f66cef015b79b1d1c1933\``);
        await queryRunner.query(`DROP INDEX \`IDX_f0b47fb5c27a55571950b280e5\` ON \`users_groups_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_35c94c977f22e838d78cadbe7d\` ON \`users_groups_users_users\``);
        await queryRunner.query(`DROP TABLE \`users_groups_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_1d8775e0b22281de858b8a0062\` ON \`usersGroups\``);
        await queryRunner.query(`DROP TABLE \`usersGroups\``);
    }

}

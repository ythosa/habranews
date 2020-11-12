import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['mail'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    mail: string;

    @Column({ type: 'simple-array', default: [] })
    tags: string[];

    @Column()
    password: string;

    @Column()
    salt: string;

    async validatePassword(passwordHash: string): Promise<boolean> {
        return bcrypt.compare(passwordHash, this.password);
    }
}

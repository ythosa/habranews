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
    email: string;

    @Column({ type: 'varchar' })
    hashedPassword: string;

    @Column({ type: 'varchar' })
    salt: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    surname: string;

    @Column({ type: 'simple-array', default: [] })
    tags: string[];

    async validatePassword(passwordHash: string): Promise<boolean> {
        return bcrypt.compare(passwordHash, this.hashedPassword);
    }
}

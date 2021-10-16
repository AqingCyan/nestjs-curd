import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../core/enums/user-role.enum';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole })
  name: UserRole;

  @Column()
  alias: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}

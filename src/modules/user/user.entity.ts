import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  /* 用户ID */
  @PrimaryGeneratedColumn()
  id: number;

  /* 用户姓名 */
  @Column('varchar', { unique: true })
  name: string;

  /* 用户密码 */
  @Column('longtext', { nullable: true })
  password: string;

  /* 用户创建时间 */
  @CreateDateColumn()
  created: Date;

  /* 用户更新时间 */
  @UpdateDateColumn()
  updated: Date;
}

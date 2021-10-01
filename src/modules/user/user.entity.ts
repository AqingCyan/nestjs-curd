import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.entity';

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
  @Exclude()
  password: string;

  /* 用户创建时间 */
  @CreateDateColumn()
  created: Date;

  /* 用户更新时间 */
  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  /**
   * 插入前对密码hash
   */
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  /**
   * 更新密码时比对
   * @param password
   */
  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

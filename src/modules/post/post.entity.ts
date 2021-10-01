import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('posts')
export class Post {
  /* post ID */
  @PrimaryGeneratedColumn()
  id: number;

  /* post 标题 */
  @Column()
  title: string;

  /* post 内容 */
  @Column('longtext', { nullable: true })
  body: string;

  /* post 创建时间 */
  @CreateDateColumn()
  created: Date;

  /* post 更新时间 */
  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';

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

  /* 多对一关系 */
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => User, (user) => user.voted)
  liked: User[];

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];
}

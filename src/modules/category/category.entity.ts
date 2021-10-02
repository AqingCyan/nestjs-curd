import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  /* 分类标签名 */
  @Column()
  name: string;

  /* 别名 */
  @Column()
  alias: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}

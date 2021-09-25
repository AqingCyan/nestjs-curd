import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  /* post ID */
  @PrimaryGeneratedColumn()
  id: number;

  /* post 标题 */
  @Column()
  title: string;

  /* post 内容 */
  @Column('longtext')
  body: string;

  /* post 创建时间 */
  @CreateDateColumn()
  created: Date;

  /* post 更新时间 */
  @UpdateDateColumn()
  updated: Date;
}

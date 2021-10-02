import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

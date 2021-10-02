import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from '../../core/interfaces/list-options.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async store(data: PostDto, user: User) {
    const entity = this.postRepository.create(data);
    await this.postRepository.save({ ...entity, user });
    return entity;
  }

  async index(options: ListOptionsInterface) {
    const { categories } = options;
    const queryBuilder = await this.postRepository.createQueryBuilder('post');

    queryBuilder.leftJoinAndSelect('post.user', 'user');
    queryBuilder.leftJoinAndSelect('post.category', 'category');

    if (categories) {
      queryBuilder.where('category.alias IN (:...categories)', { categories });
    }

    return queryBuilder.getMany();
  }

  async show(id: string) {
    return await this.postRepository.findOne(id);
  }

  async update(id: string, data: Partial<PostDto>) {
    return await this.postRepository.update(id, data);
  }

  async destroy(id: string) {
    return await this.postRepository.delete(id);
  }

  async vote(id: number, user: User) {
    await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .add(id);
  }

  async unVote(id: number, user: User) {
    await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .remove({ id });
  }

  async liked(id: number) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'liked')
      .of(id)
      .loadMany();
  }
}

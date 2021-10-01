import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';

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

  async index() {
    return await this.postRepository.find({
      relations: ['user'],
    });
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
}

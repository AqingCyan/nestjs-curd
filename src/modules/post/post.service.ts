import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async store(data) {
    const entity = this.postRepository.create(data);
    await this.postRepository.save(entity);
    return entity;
  }

  async index() {
    return await this.postRepository.find();
  }
}

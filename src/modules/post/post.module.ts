import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { Tag } from '../tag/tag.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag]),
    AuthModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

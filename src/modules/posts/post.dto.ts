import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'title必须是字符串' })
  readonly title: string;
}

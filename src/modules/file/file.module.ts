import { BadRequestException, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      fileFilter(req, file, callback) {
        const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
        const allowed = mimetypes.some((type) => type === file.mimetype);

        if (allowed) {
          callback(null, true);
        } else {
          callback(new BadRequestException('不支持上传此类型的文件'), false);
        }
      },
    }),
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}

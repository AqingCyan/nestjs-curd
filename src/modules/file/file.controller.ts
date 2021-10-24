import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async store(@UploadedFile() data) {
    console.log(data);
  }
}

import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './file.service';
import { FileDto } from './file.dto';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async store(@UploadedFile() data: FileDto) {
    return await this.fileService.store(data);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const file = await this.fileService.show(id);

    res.sendFile(file.filename, {
      root: 'uploads',
      headers: {
        'Content-type': file.mimetype,
      },
    });
  }
}

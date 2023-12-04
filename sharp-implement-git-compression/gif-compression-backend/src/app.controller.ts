import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync } from 'fs';
import * as sharp from 'sharp';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 处理文件上传的POST请求
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads', // 上传文件存储的目录
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path; // 返回上传文件的路径
  }

  // 处理图片压缩的GET请求
  @Get('compression')
  async compression(
    @Query('path') filePath: string, // 从查询参数获取文件路径
    @Query('color', ParseIntPipe) color: number, // 从查询参数获取颜色数量，使用ParseIntPipe确保颜色数量为整数
    @Res() res: Response,
  ) {
    if (!existsSync(filePath)) {
      // 如果文件不存在，抛出BadRequestException异常
      throw new BadRequestException('文件不存在');
    }

    // 使用sharp库进行图片压缩
    const data = await sharp(filePath, {
      animated: true,
      limitInputPixels: false,
    })
      .gif({
        colours: color, // 设置压缩后的颜色数量
      })
      .toBuffer();

    // 设置HTTP响应头，指定文件名为"dest.gif"
    res.set('Content-Disposition', `attachment; filename="dest.gif"`);

    // 发送压缩后的图片数据作为响应
    res.send(data);
  }

  // 处理根路径的GET请求，返回简单的字符串
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

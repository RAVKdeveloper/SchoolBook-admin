import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CustomHeaders } from '@app/common'

import { AuthGuard } from '../guards/auth.guard'

import { FilesService } from './files.service'

@ApiTags('Upload-files')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AuthGuard)
@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/user-avatar')
  create(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.filesService.uploadUserAvatar(file, req[CustomHeaders.USER].userId)
  }

  @Get()
  findAll() {
    return this.filesService.findAll()
  }
}

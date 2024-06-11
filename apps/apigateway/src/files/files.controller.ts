import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import type { Request } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CustomHeaders } from '@app/common'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyOwnerGuard } from '../guards/only-owner.guard'

import { FilesService } from './files.service'

@ApiTags('Upload-files')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AuthGuard)
@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Successful upload user avatar',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/user-avatar')
  create(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.filesService.uploadUserAvatar(file, req[CustomHeaders.USER].userId)
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Successful upload school avatar',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @UseGuards(OnlyOwnerGuard)
  @Post('/school-avatar')
  createSchoolAvatar(@UploadedFile() file: Express.Multer.File, @Param('schoolId') id: string) {
    return this.filesService.uploadSchoolAvatar(file, +id)
  }

  @ApiOkResponse({
    description: 'Successful delete user avatar',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @Delete('/delete-avatar')
  deleteUserAvatar(@Req() req: Request) {
    return this.filesService.deleteUserAvatar(req[CustomHeaders.USER].userId)
  }

  @ApiOkResponse({
    description: 'Successful delete school avatar',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @Delete('/delete-school-avatar')
  deleteSchoolAvatar(@Req() req: Request, @Param('schoolId') id: string) {
    return this.filesService.deleteSchoolAvatar(+id, req[CustomHeaders.USER].userId)
  }
}

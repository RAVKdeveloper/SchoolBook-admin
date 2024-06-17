import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'

import { ClassService } from './class.service'

import { CreateClassDto } from './dto/create-class.dto'
import { DeleteClassDto } from './dto/delete-class.dto'
import { GetAllClessesDto } from './dto/get-all-classes.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { ResponseAllClassDto } from './res-dto/res-all-class.dto'
import { ResponseOneClassDto } from './res-dto/res-one-class.dto'

@ApiTags('Class')
@ApiCookieAuth()
@UseInterceptors(GrpcToHttpInterceptor)
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiCreatedResponse({ description: 'Created class', type: ResponseOneClassDto })
  @UseGuards(OnlyModeratorGuard)
  @Post()
  create(@Body() dto: CreateClassDto) {
    return this.classService.create(dto)
  }

  @ApiOkResponse({ description: 'Return all classes by filters', type: ResponseAllClassDto })
  @Get()
  findAll(@Query() dto: GetAllClessesDto) {
    return this.classService.findAll(dto)
  }

  @ApiOkResponse({ description: 'Find one class by id', type: ResponseOneClassDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id)
  }

  @ApiCreatedResponse({ description: 'Updated class', type: ResponseOneClassDto })
  @UseGuards(OnlyModeratorGuard)
  @Patch(':id')
  update(@Body() dto: UpdateClassDto) {
    return this.classService.update(dto)
  }

  @ApiOkResponse({ description: 'Deleted class', type: ResponseOneClassDto })
  @UseGuards(OnlyModeratorGuard)
  @Delete('delete')
  remove(@Body() dto: DeleteClassDto) {
    return this.classService.remove(dto)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './services/projects.service';
import { ApiTokenGuard } from '../auth/api-guard';

@Controller('projects')
@UseGuards(ApiTokenGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'images', maxCount: 8 },
    ]),
  )
  async create(
    @Body() dto: CreateProjectDto,
    @UploadedFiles()
    files: {
      video?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
  ) {
    const video = files?.video?.[0];
    const images = files?.images;
    return this.projectsService.createProject(dto, video, images);
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}

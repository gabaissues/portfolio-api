import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AITranslatorAdapter } from '../adapters/ai-translator.provider';
import { ProjectEntity } from '../entities/project.entity';
import { UploadToCloudAdapter } from '../adapters/upload.provider';
import { CreateProjectDto } from '../dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translator: AITranslatorAdapter,
    private readonly uploader: UploadToCloudAdapter,
  ) {}
  async createProject(
    dto: CreateProjectDto,
    video?: Express.Multer.File,
    images?: Express.Multer.File[],
  ) {
    if (!video) {
      throw new BadRequestException('Video field is required');
    }

    const imagesUrl: string[] = [];

    if (images) {
      for (const image of images) {
        const uploadImageRes: string = await this.uploader.send(
          'images',
          image,
        );
        imagesUrl.push(uploadImageRes);
      }
    }

    const videoUrl: string = await this.uploader.send('video', video);
    const projectEntity = await ProjectEntity.createFromDto(
      dto,
      videoUrl,
      imagesUrl,
      this.translator,
    );

    const entityData = projectEntity.toJSON();

    const project = await this.prisma.project.create({
      data: entityData,
    });

    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    return project;
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}

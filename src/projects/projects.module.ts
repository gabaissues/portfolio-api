import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { PrismaService } from '../prisma.service';
import { AITranslatorAdapter } from './adapters/ai-translator.provider';
import { UploadToCloudAdapter } from './adapters/upload.provider';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    AITranslatorAdapter,
    UploadToCloudAdapter,
    ProjectsService,
  ],
  exports: [ProjectsService],
  imports: [],
})
export class ProjectsModule {}

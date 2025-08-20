import { ProjectType } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';
import { TranslatorInterface } from '../dto/translator.interface';
import { UpdateProjectDto } from '../dto/update-project.dto';

export type UploadResult = {
  videoUrl: string;
  imagesUrl?: string[];
};

export interface UploadAdapter {
  upload(
    video: Express.Multer.File,
    images?: Express.Multer.File[],
  ): Promise<UploadResult>;
}
export interface Translator {
  translate(text: string): Promise<string>;
}

type ProjectEntityProps = {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  tags: string[];
  url: string;
  videoUrl: string;
  imagesUrl?: string[];
  name_en: string;
  description_en: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ProjectEntity {
  public readonly id: string;
  public name: string;
  public description: string;
  public tags: string[];
  public url: string;
  public type: ProjectType;
  public videoUrl: string;
  public imagesUrl: string[];
  public name_en: string;
  public description_en: string;
  public readonly createdAt: Date;
  public updatedAt?: Date;

  constructor(props: ProjectEntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.tags = props.tags;
    this.type = props.type;
    this.url = props.url;
    this.videoUrl = props.videoUrl;
    this.imagesUrl = props.imagesUrl ?? [];
    this.name_en = props.name_en;
    this.description_en = props.description_en;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt;
  }

  static async createFromDto(
    dto: CreateProjectDto,
    videoUrl: string,
    imagesUrl: string[] | undefined,
    translator?: TranslatorInterface,
  ): Promise<ProjectEntity> {
    if (!videoUrl)
      throw new Error('Video file is required to create a Project');

    const name_en = await translator?.translate(dto.name);
    const description_en = await translator?.translate(dto.description);

    const generatedId = ProjectEntity.generateId();

    return new ProjectEntity({
      id: generatedId,
      name: dto.name,
      description: dto.description,
      tags: dto.tags,
      url: dto.url,
      type: dto.type as ProjectType,
      videoUrl,
      imagesUrl,
      name_en: name_en || dto.name,
      description_en: description_en || dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateContent(
    data: UpdateProjectDto,
    translator?: Translator,
  ): Promise<void> {
    if (data.name !== undefined) {
      this.name = data.name;
      this.name_en = translator
        ? await translator.translate(data.name)
        : `${data.name}_en`;
    }

    if (data.description !== undefined) {
      this.description = data.description;
      this.description_en = translator
        ? await translator.translate(data.description)
        : `${data.description}_en`;
    }

    if (data.videoUrl !== undefined) {
      this.videoUrl = data.videoUrl;
    }

    if (data.imagesUrl !== undefined) {
      this.imagesUrl = data.imagesUrl;
    }

    if (data.tags !== undefined) {
      this.tags = Array.isArray(data.tags) ? data.tags : [data.tags];
    }

    if (data.url !== undefined) {
      this.url = data.url;
    }

    this.updatedAt = new Date();
  }

  private static generateId(): string {
    return `proj_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      tags: this.tags
        .toString()
        .split(',')
        .map((e) => e.trim()),
      url: this.url,
      videoUrl: this.videoUrl,
      imagesUrl: this.imagesUrl,
      name_en: this.name_en,
      description_en: this.description_en,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

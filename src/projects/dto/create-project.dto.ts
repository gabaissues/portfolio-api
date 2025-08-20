// src/projects/dto/create-project.dto.ts
import { IsString, IsOptional, IsUrl, IsArray, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProjectType } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsEnum(ProjectType)
  type: string;

  @IsString()
  description: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.filter(
        (v): v is string => typeof v === 'string' && v.trim() !== '',
      );
    }
    return typeof value === 'string' && value.trim() !== ''
      ? value
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[] = [];

  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsArray()
  imagesUrl?: string[];
}

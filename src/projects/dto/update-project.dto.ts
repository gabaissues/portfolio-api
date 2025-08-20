export class UpdateProjectDto {
  name: string;
  description: string;
  url: string;
  tags: string;
  videoUrl: string;
  imagesUrl?: string[];
  updatedAt: Date;
}

import { Injectable } from '@nestjs/common';
import { UploadInterface } from '../dto/upload.interface';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadToCloudAdapter implements UploadInterface {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      endpoint: process.env.R2_ENDPOINT,
      region: 'auto',
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
      },
    });
  }

  async send(folder: string, file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: 'portfolio',
      Key: `${folder}/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype || 'application/octet-stream',
    };

    await this.client.send(new PutObjectCommand(uploadParams));
    return `https://files.gabaissues.com/${folder}/${fileName}`;
  }
}

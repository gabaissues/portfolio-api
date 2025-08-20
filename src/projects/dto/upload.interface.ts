export interface UploadInterface {
  send(folder: string, file: Express.Multer.File): Promise<string>;
}

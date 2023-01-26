import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { OSSService } from "@nest-public/nest-oss"
@Controller("upload")
export class UploadController {
  constructor(private readonly oSSService: OSSService) {}
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file: any) {
    return await this.oSSService.upload(file)
  }
}

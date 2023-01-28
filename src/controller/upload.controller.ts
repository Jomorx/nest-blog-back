import { Body, Controller, Post, Request } from "@nestjs/common"
import { ImageFileDto } from "src/dto/imageFileDto"
import { UploadService } from "../service"
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post("image")
  async uploadImage(@Request() req: Request) {
    return await this.uploadService.uploadImage(
      req.body as unknown as ImageFileDto
    )
  }
}

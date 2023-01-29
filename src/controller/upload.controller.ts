import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common"
import { ImageFileDto } from "src/dto/imageFileDto"
import { AuthGuard } from "src/guard/authGuard"
import { UploadService } from "../service"
@Controller("upload")
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post("image")
  async uploadImage(@Request() req: Request) {
    return await this.uploadService.uploadImage(
      req.body as unknown as ImageFileDto
    )
  }
}

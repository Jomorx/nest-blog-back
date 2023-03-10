import { Body, Controller, Get, UseGuards, Post, Query } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { noLogin } from "src/guard/auth"
import { AuthGuard } from "src/guard/authGuard"
import { Tag } from "src/model"
import { TagService } from "src/service/tag.service"

@Controller("tag")
@UseGuards(AuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get("getTagList")
  @noLogin()
  async getTagList(@Query() PageDto: PageDto) {
    return await this.tagService.getTagList(PageDto)
  }
  @Post("insertTag")
  async insertTag(@Body("tagName") tagName) {
    return await this.tagService.insertTag(tagName)
  }

  @Post("deleteTagList")
  async deleteTagList(@Body("tagList") tagList) {
    return await this.tagService.deleteTagList(tagList)
  }
  @Post("editTag")
  async editTag(@Body() tag) {
    return await this.tagService.editTag(tag)
  }
}

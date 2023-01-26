import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { TagService } from "src/service/tag.service"

@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get("getTagList")
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
  async editTag(@Body("tagId") tagId, @Body("tagName") tagName) {
    console.log(tagId, tagName)
    return await this.tagService.editTag(tagId, tagName)
  }
}

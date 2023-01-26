import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { ConfigService } from "src/service/config.service"

@Controller("config")
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get("getConfigById/:id")
  async getConfigById(@Param("id") id: number) {
    return await this.configService.getConfigById(id)
  }
  //   @Post('deleteConfigList')
  //   async deleteTagList(@Body('categoryList') tagList) {
  //     return await this.configService.deleteTagList(tagList);
  //   }
  @Post("insertConfig")
  async insertConfig(@Body() Category) {
    return await this.configService.insertConfig(Category)
  }
  @Post("editConfig")
  async editConfig(@Body() Config) {
    return await this.configService.editConfig(Config)
  }
}

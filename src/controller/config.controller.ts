import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { noLogin } from "src/guard/auth"
import { AuthGuard } from "src/guard/authGuard"
import { ConfigService } from "src/service/config.service"

@Controller("config")
@UseGuards(AuthGuard)
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get("getConfigById/:id")
  @noLogin()
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

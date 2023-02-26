import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { UpdateArticleDto } from "src/dto/updateArticleDto"
import { UploadArticleDto } from "src/dto/uploadArticleDto"
import { noLogin } from "src/guard/auth"
import { AuthGuard } from "src/guard/authGuard"
import { ArticleService } from "src/service/article.service"

@Controller("article")
@UseGuards(AuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  //获取文章列表
  @Get("getArticleList")
  @noLogin()
  async getArticleList(@Query() pageDto: PageDto) {
    return this.articleService.getArticleList(pageDto)
  }
  //根据id获取文章
  @Get("getArticleById/:id")
  @noLogin()
  async getArticleById(@Param("id") id) {
    return this.articleService.getArticleById(id)
  }
  //上传文章
  @Post("uploadArticle")
  async uploadArticle(@Body() uploadArticleDto: UploadArticleDto) {
    return this.articleService.uploadArticle(uploadArticleDto)
  }
  //更新文章
  @Post("updateArticle")
  async updateArticle(@Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.updateArticle(updateArticleDto)
  }
  //删除文章
  @Post("deleteArticleList")
  async deleteArticleList(@Body("articleIdList") articleIdList: number[]) {
    return this.articleService.deleteArticleList(articleIdList)
  }
  //切换top
  @Post("switchIsTop")
  async switchIsTop(
    @Body("articleId") articleId: number,
    @Body("isTop") isTop: number
  ) {
    return await this.articleService.switchIsTop(articleId, isTop)
  }
  //获取时间归档
  @noLogin()
  @Get("getArticleTimeLine")
  async getArticleTimeLine() {
    return this.articleService.getArticleTimeLine()
  }
  @noLogin()
  @Get("viewArticle/:id")
  async viewArticle(@Param("id") id: number) {
    return this.articleService.viewArticle(id)
  }

  @noLogin()
  @Get("getArticleByKeyword")
  async getArticleByKeyword(@Query("keyword") keyword: string) {
    return this.articleService.getArticleByKeyword(keyword)
  }
}

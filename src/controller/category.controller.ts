import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { noLogin } from "src/guard/auth"
import { AuthGuard } from "src/guard/authGuard"
import { CategoryService } from "src/service/category.service"

@Controller("category")
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("getCategoryList")
  @noLogin()
  async getCategoryList(@Query() pageDto: PageDto) {
    return await this.categoryService.getCategoryList(pageDto)
  }
  @Post("deleteCategoryList")
  async deleteTagList(@Body("categoryList") tagList) {
    return await this.categoryService.deleteTagList(tagList)
  }
  @Post("insertCategory")
  async insertTag(@Body() Category) {
    return await this.categoryService.insertCategory(Category)
  }
  @Post("editCategory")
  async editCategory(@Body() Category) {
    return await this.categoryService.editCategory(Category)
  }
}

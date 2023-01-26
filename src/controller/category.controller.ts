import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { CategoryService } from "src/service/category.service"

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("getCategoryList")
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

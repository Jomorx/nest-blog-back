import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Op } from "sequelize"
import { PageDto } from "src/dto/pageDto"
import { AppException } from "src/filter/appException"
import { Article } from "src/model/articleModel"
import { Category } from "src/model/categoryModel"
import { success } from "src/utils/R"

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(Article) private readonly articleModel: typeof Article
  ) {}
  async getCategoryList(pageDto: PageDto) {
    let res: { rows?: Category[]; count?: number } = {}
    if (pageDto.searchText !== "") {
      res = await this.categoryModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize,
        where: { categoryName: { [Op.like]: `%${pageDto.searchText}%` } }
      })
    } else {
      res = await this.categoryModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize
      })
    }

    for (let i = 0; i < res.rows.length; i++) {
      const data = await this.articleModel.count({
        where: { categoryId: res.rows[i].categoryId }
      })
      res.rows[i].setDataValue("articleCount", data)
    }
    return success(res)
  }

  async deleteTagList(categoryList: number[]) {
    for (const item of categoryList) {
      const count = await this.articleModel.count({
        where: { categoryId: item }
      })
      if (count !== 0) {
        throw new AppException(400, "删除失败,该分类存在文章")
      }
    }
    for (const item of categoryList) {
      await this.categoryModel.destroy({ where: { categoryId: item } })
    }
    return success(null)
  }

  async insertCategory(categoryModel: Category) {
    const res = await this.categoryModel.create(categoryModel)
    return success(res)
  }
  async editCategory(categoryModel: Category) {
    const res = await this.categoryModel.update(categoryModel, {
      where: { categoryId: categoryModel.categoryId }
    })
    return success(res)
  }
}

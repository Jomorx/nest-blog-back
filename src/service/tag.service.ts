import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Tag } from "src/model/tagModel"
import { success } from "src/utils/R"
import { ArticleTag } from "src/model/articleTagModel"
import { PageDto } from "src/dto/pageDto"
import { AppException } from "src/filter/appException"
import { Op } from "sequelize"
@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag) private tagModel: typeof Tag,
    @InjectModel(ArticleTag) private articleTag: typeof ArticleTag
  ) {}
  async insertTag(tagName: string) {
    const res = await this.tagModel.create(tagName)
    return success(res)
  }
  async getTagList(pageDto: PageDto) {
    let res: { rows?: Tag[]; count?: number } = {}
    if (pageDto.searchText !== "") {
      res = await this.tagModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize,
        where: { tagName: { [Op.like]: `%${pageDto.searchText}%` } }
      })
    } else {
      res = await this.tagModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize
      })
    }

    for (let i = 0; i < res.rows.length; i++) {
      const data = await this.articleTag.count({
        where: { tagId: res.rows[i].tagId }
      })
      res.rows[i].setDataValue("articleCount", data)
    }
    return success(res)
  }

  async deleteTagList(tagList: number[]) {
    for (const item of tagList) {
      const count = await this.articleTag.count({ where: { tagId: item } })
      if (count !== 0) {
        throw new AppException(400, "删除失败,该标签存在文章")
      }
    }
    for (const item of tagList) {
      await this.tagModel.destroy({ where: { tagId: item } })
    }
    return success(null)
  }

  async editTag(tagId: number, tagName: string) {
    try {
      await this.tagModel.update(
        { tagName },
        {
          where: { tagId: tagId }
        }
      )
    } catch {
      throw new AppException(500, "更新异常")
    }
    return success(null)
  }
}

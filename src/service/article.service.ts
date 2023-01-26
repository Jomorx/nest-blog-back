import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Op, fn, col, where } from "sequelize"
import { PageDto } from "src/dto/pageDto"
import { UpdateArticleDto } from "src/dto/updateArticleDto"
import { UploadArticleDto } from "src/dto/uploadArticleDto"
import { Article } from "src/model/articleModel"
import { ArticleTag } from "src/model/articleTagModel"
import { Category } from "src/model/categoryModel"
import { Tag } from "src/model/tagModel"
import { success } from "src/utils/R"
@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article) private articleModel: typeof Article,
    @InjectModel(ArticleTag) private articleTagModel: typeof ArticleTag
  ) {}

  async updateArticle(updateArticleDto: UpdateArticleDto) {
    const res = await this.articleModel.update(updateArticleDto, {
      where: { articleId: updateArticleDto.articleId }
    })
    await this.articleTagModel.destroy({
      where: { articleId: updateArticleDto.articleId }
    })
    for (const item of updateArticleDto.tags) {
      await this.articleTagModel.create({
        articleId: updateArticleDto.articleId,
        tagId: item.tagId
      })
    }

    return success(res)
  }
  async uploadArticle(uploadArticleDto: UploadArticleDto) {
    const res = await this.articleModel.create(uploadArticleDto, {
      include: [
        {
          model: ArticleTag
        }
      ]
    })

    return success(res)
  }

  async getArticleList(pageDto: PageDto) {
    const res = await this.articleModel.findAndCountAll({
      include: [
        {
          model: Tag,
          attributes: ["tagId", "tagName"]
        },
        {
          model: Category,
          attributes: ["categoryName"]
        }
      ],
      attributes: {
        exclude: ["articleContent"]
      },
      limit: pageDto.pageSize,
      offset: (pageDto.currentPage - 1) * pageDto.pageSize,
      distinct: true,
      order: [["is_top", "Desc"]]
    })
    return success(res)
  }

  async getArticleById(id: number) {
    const res = await this.articleModel.findOne({
      where: { articleId: id },
      include: [
        {
          model: Tag,
          attributes: ["tagId", "tagName"]
        },
        {
          model: Category,
          attributes: ["categoryName", "categoryId"]
        }
      ]
    })
    return success(res)
  }
  async deleteArticleList(articleIdList: number[]) {
    for (const item of articleIdList) {
      await this.articleModel.destroy({
        where: { articleId: item }
      })
      await this.articleTagModel.destroy({ where: { articleId: item } })
    }
    return success(null)
  }

  async switchIsTop(articleId, isTop) {
    if (isTop === 1) {
      await this.articleModel.update({ isTop: 0 }, { where: { articleId } })
    } else {
      await this.articleModel.update({ isTop: 1 }, { where: { articleId } })
    }
    return success(null, "置顶成功")
  }
  async getArticleTimeLine() {
    const data = await this.articleModel.findAll({
      attributes: [
        [fn("COUNT", col("article_id")), "count"],
        [fn("DATE_FORMAT", col("created_at"), "%Y"), "days"]
      ],
      group: [fn("DATE_FORMAT", col("created_at"), "%Y")],
      raw: true
    })
    for (const item of data) {
      const articles = await this.articleModel.findAll({
        where: {
          [Op.and]: where(fn("DATE_FORMAT", col("created_at"), "%Y"), item.days)
        },
        attributes: [
          "articleTitle",
          "articleId",
          [fn("DATE_FORMAT", col("created_at"), "%Y-%m-%d  "), "createdAt"]
        ]
      })
      item.articles = articles
    }
    return success(data)
  }
}

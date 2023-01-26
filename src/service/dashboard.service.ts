import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import sequelize from "sequelize"
import { Article, ArticleTag, Category, FriendChain, Tag } from "src/model"
import { success } from "src/utils/R"

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(Tag) private readonly tagModel: typeof Tag,
    @InjectModel(Article) private readonly articleModel: typeof Article,
    @InjectModel(FriendChain)
    private readonly friendChainModel: typeof FriendChain,
    @InjectModel(ArticleTag) private readonly articleTagModel: typeof ArticleTag
  ) {}
  async getCardInfo() {
    const getArticleCount = this.articleModel.count()
    const getCategoryCount = this.categoryModel.count()
    const getTagCount = this.tagModel.count()
    const getFriendChainCount = this.friendChainModel.count()

    const [articleCount, tagCount, categoryCount, friendChainCount] =
      await Promise.all([
        getArticleCount,
        getTagCount,
        getCategoryCount,
        getFriendChainCount
      ])
    return success({
      articleCount,
      tagCount,
      categoryCount,
      friendChainCount
    })
  }
  async getChartInfo() {
    //查询tag，以及每个tag的count
    const getTagData = this.articleTagModel.findAll({
      group: "tagId",
      attributes: [
        "tagId",
        [sequelize.fn("count", sequelize.col("*")), "count"]
      ],
      include: [
        {
          model: Tag,
          attributes: ["tagName"]
        }
      ]
    })
    //查询category，以及每个category的count
    const getCategoryData = this.articleModel.findAll({
      group: "categoryId",
      attributes: [
        "categoryId",
        [sequelize.fn("count", sequelize.col("*")), "count"]
      ],
      include: [{ model: Category, attributes: ["categoryName"] }]
    })
    //查询阅读量最高的article
    const gatArticleData = this.articleModel.findAll({
      order: [["viewCount", "Desc"]],
      limit: 5,
      attributes: ["viewCount", "articleTitle"]
    })
    const [tagData, categoryData, articleData] = await Promise.all([
      getTagData,
      getCategoryData,
      gatArticleData
    ])
    return success({ tagData, categoryData, articleData })
  }
}

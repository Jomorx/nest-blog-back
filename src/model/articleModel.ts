import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import { ArticleTag } from "./articleTagModel"
import { Category } from "./categoryModel"
import { Tag } from "./tagModel"
@Table({ modelName: "bl_article" })
export class Article extends Model<Article> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "article_id" })
  articleId: number
  @Column({ field: "article_title" })
  articleTitle: string
  @Column({ field: "article_description" })
  articleDescription: string
  @Column({ field: "article_content" })
  articleContent: string
  @Column({ field: "article_cover" })
  articleCover: string
  @Default(0)
  @Column({ field: "view_count" })
  viewCount: number
  @Column({ field: "is_top" })
  isTop: number
  @ForeignKey(() => Category) // 定义user_id字段为外键，关联User表
  @Column({ field: "category_id" })
  categoryId: number
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date

  @HasMany(() => ArticleTag)
  tags: Tag[]
  @BelongsTo(() => Category)
  category: Category
  @BelongsToMany(() => Tag, () => ArticleTag) // 建立多对多关联。第二个参数是中间表UserRole
  tagList: Tag[]
  //归档时间分类查询
  days: Date
  count: number
  articles: Article[]
}

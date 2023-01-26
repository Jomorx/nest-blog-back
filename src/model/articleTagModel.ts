import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import { Article } from "./articleModel"
import { Tag } from "./tagModel"

@Table({ tableName: "bl_article_tag" })
export class ArticleTag extends Model<ArticleTag> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number
  @ForeignKey(() => Article)
  @Column({ field: "article_id" })
  articleId: number
  @ForeignKey(() => Tag)
  @Column({ field: "tag_id" })
  tagId: number
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
  @BelongsTo(() => Article, "article_id")
  article: Article
  @BelongsTo(() => Tag, "tag_id")
  tag: Tag
}

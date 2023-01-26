import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import { Article } from "./articleModel"
import { ArticleTag } from "./articleTagModel"
@Table({ modelName: "bl_tag" })
export class Tag extends Model<Tag> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "tag_id" })
  tagId: number
  @Column({ field: "tag_name" })
  tagName: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
  @BelongsToMany(() => Article, () => ArticleTag)
  articleList: Article[]

  articleCount: number
}

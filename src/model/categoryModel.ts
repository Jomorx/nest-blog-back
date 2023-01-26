import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"

@Table({ tableName: "bl_category" })
export class Category extends Model<Category> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "category_Id" })
  categoryId: number
  @Column({ field: "category_cover" })
  categoryCover: string
  @Column({ field: "category_name" })
  categoryName: string
  @Column({ field: "category_description" })
  categoryDescription: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
  articleCount: number
}

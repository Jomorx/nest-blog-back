import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
@Table({ tableName: "bl_manager" })
export class Manager extends Model<Manager> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number
  @Column
  account: string
  @Column
  password: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
}

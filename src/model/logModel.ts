import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"

@Table({ tableName: "bl_log" })
export class Log extends Model<Log> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "log_Id" })
  logId: number
  @Column({ field: "log_content" })
  logContent: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
}

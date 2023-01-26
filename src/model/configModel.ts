import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
@Table({ modelName: "bl_config" })
export class Config extends Model<Config> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "config_id" })
  configId: number
  @Column({ field: "config_name" })
  configName: string
  @Column({ field: "config_content" })
  configContent: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
}

import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"

@Table({ tableName: "bl_role" })
export class Role extends Model<Role> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "role_id" })
  roleId: number
  @Column({ field: "role_name" })
  roleName: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
}

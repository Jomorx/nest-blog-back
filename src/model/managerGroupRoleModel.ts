import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import { Manager } from "./managerModel"
import { Role } from "./roleModel"

@Table({ tableName: "bl_manager_group_role" })
export class ManagerGroupRole extends Model<ManagerGroupRole> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "manager_group_role_id" })
  managerGroupRoleId: number
  @Column({ field: "role_id" })
  roleId: string
  @Column({ field: "group_id" })
  groupId: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date

  @BelongsTo(() => Manager, "manager_id")
  manager: Manager
  @BelongsTo(() => Role, "role_id")
  role: Role
}

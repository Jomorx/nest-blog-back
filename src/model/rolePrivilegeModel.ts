import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
@Table({ tableName: "bl_role_privilege" })
export class RolePrivilege extends Model<RolePrivilege> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "role_privilege_id" })
  rolePrivilegeId: number
  @Column({ field: "role_id" })
  roleId: string
  @Column({ field: "privilege_id" })
  privilegeId: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
}

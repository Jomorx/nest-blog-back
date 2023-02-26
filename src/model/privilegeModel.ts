import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
@Table({ tableName: "bl_privilege" })
export class Privilege extends Model<Privilege> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "privilege_id" })
  privilegeId: number
  @Column({ field: "menu_path" })
  menuPath: string
  @Column({ field: "menu_name" })
  menuName: string
  @Column({ field: "parent_id" })
  parentId: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
  @HasMany(() => Privilege, "parentId")
  menus: Privilege
}

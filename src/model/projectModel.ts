import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
@Table({ modelName: "bl_project" })
export class Project extends Model<Project> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "project_id" })
  projectId: number
  @Column({ field: "project_name" })
  projectName: string
  @Column({ field: "project_cover" })
  projectCover: string
  @Column({ field: "project_description" })
  projectDescription: string
  @Column({ field: "project_link" })
  projectLink: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
}

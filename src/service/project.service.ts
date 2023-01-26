import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Op } from "sequelize"
import { PageDto } from "src/dto/pageDto"
import { Project } from "src/model/projectModel"
import { success } from "src/utils/R"
@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}

  async updateProject(updateProjectDto: Project) {
    const res = await this.projectModel.update(updateProjectDto, {
      where: { projectId: updateProjectDto.projectId }
    })
    return success(res)
  }
  async uploadProject(uploadProjectDto: Project) {
    const res = await this.projectModel.create(uploadProjectDto)

    return success(res)
  }

  async getProjectList(pageDto: PageDto) {
    let res: { rows?: Project[]; count?: number } = {}
    if (pageDto.searchText !== "") {
      res = await this.projectModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize,
        where: { projectName: { [Op.like]: `%${pageDto.searchText}%` } }
      })
    } else {
      res = await this.projectModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize
      })
    }
    return success(res)
  }

  async getProjectById(id: number) {
    return await this.projectModel.findOne({
      where: { projectId: id }
    })
  }
  async deleteProjectList(articleIdList: number[]) {
    for (const item of articleIdList) {
      await this.projectModel.destroy({
        where: { projectId: item }
      })
    }
    return success(null)
  }
}

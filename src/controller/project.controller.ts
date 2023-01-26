import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { ProjectService } from "src/service/project.service"

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get("getProjectList")
  async getProjectList(@Query() pageDto: PageDto) {
    console.log(pageDto)
    return this.projectService.getProjectList(pageDto)
  }
  @Get("getProjectById/:id")
  async getProjectById(@Param("id") id) {
    return this.projectService.getProjectById(id)
  }
  @Post("uploadProject")
  async uploadProject(@Body() uploadProjectDto) {
    return this.projectService.uploadProject(uploadProjectDto)
  }
  @Post("updateProject")
  async updateProject(@Body() updateProjectDto) {
    return this.projectService.updateProject(updateProjectDto)
  }
  @Post("deleteProjectList")
  async deleteProjectList(@Body("projectIdList") projectIdList: number[]) {
    return this.projectService.deleteProjectList(projectIdList)
  }
}

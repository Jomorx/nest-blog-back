import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { noLogin } from "src/guard/auth"
import { AuthGuard } from "src/guard/authGuard"
import { ProjectService } from "src/service/project.service"

@Controller("project")
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @noLogin()
  @Get("getProjectList")
  async getProjectList(@Query() pageDto: PageDto) {
    console.log(pageDto)
    return this.projectService.getProjectList(pageDto)
  }
  @noLogin()
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

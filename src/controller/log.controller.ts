import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { noLogin } from "src/guard/auth"
import { AuthGuard } from "src/guard/authGuard"
import { LogService } from "src/service/log.service"

@Controller("log")
@UseGuards(AuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get("getLogList")
  @noLogin()
  async getLogList(@Query() PageDto: PageDto) {
    return await this.logService.getLogList(PageDto)
  }
  @Post("insertLog")
  async insertLog(@Body("logContent") logContent) {
    return await this.logService.insertLog(logContent)
  }

  @Post("deleteLogList")
  async deleteLogList(@Body("logList") logList) {
    return await this.logService.deleteLogList(logList)
  }
  @Post("editLog")
  async editLog(@Body("logId") logId, @Body("logContent") logContent) {
    return await this.logService.editLog(logId, logContent)
  }
}

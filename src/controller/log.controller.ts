import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { LogService } from "src/service/log.service"

@Controller("log")
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get("getLogList")
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

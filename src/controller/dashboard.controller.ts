import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { DashboardService } from "src/service"

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get("getCardInfo")
  async getCardInfo() {
    return await this.dashboardService.getCardInfo()
  }
  @Get("getChartInfo")
  async getChartInfo() {
    return await this.dashboardService.getChartInfo()
  }
}

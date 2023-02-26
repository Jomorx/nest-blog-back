import { Controller, Get, Param } from "@nestjs/common"
import { PrivilegeService } from "src/service/privilege.service"

@Controller("privilege")
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}
  @Get("getPrivilegeInfo/:privilegeId")
  async getPrivilegeInfo(@Param("privilegeId") privilegeId: number) {
    return await this.privilegeService.getPrivilegeInfo(privilegeId)
  }
}

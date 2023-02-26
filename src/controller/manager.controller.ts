import { Body, Controller, HostParam, Post } from "@nestjs/common"
import { LoginDto } from "../dto/loginDto"
import { LoginService } from "../service/manager.service"

@Controller("manager")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post("getManagerInfo")
  async getManagerInfo(@Body() loginDto: LoginDto, @HostParam() host: string) {
    return await this.loginService.getManagerInfo(loginDto)
  }
}

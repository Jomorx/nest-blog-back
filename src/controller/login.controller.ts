import { Body, Controller, HostParam, Post } from "@nestjs/common"
import { LoginDto } from "../dto/loginDto"
import { LoginService } from "../service/login.service"

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Body() loginDto: LoginDto, @HostParam() host: string) {
    console.log("host", host)
    return await this.loginService.login(loginDto)
  }
}

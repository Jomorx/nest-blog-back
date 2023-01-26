import { HttpStatus, Injectable } from "@nestjs/common"
import { LoginDto } from "../dto/loginDto"
import { Manager } from "src/model/managerModel"
import { success } from "src/utils/R"
import { AppException } from "src/filter/appException"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/sequelize"
@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Manager) private readonly managerModel: typeof Manager
  ) {}
  async login(loginDto: LoginDto) {
    const manager = await this.managerModel.findOne({
      where: [{ account: loginDto.account }, { password: loginDto.password }]
    })
    if (manager === null) {
      throw new AppException(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED")
    }
    const { account, password } = manager
    return success({
      token: this.jwtService.sign({ account, password }, { expiresIn: "1h" })
    })
  }
}

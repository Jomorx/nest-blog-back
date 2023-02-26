import { HttpStatus, Injectable } from "@nestjs/common"
import { LoginDto } from "../dto/loginDto"
import {
  Manager,
  ManagerGroupRole,
  Privilege,
  Role,
  RolePrivilege
} from "src/model"
import { success } from "src/utils/R"
import { AppException } from "src/filter/appException"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/sequelize"
@Injectable()
export class PrivilegeService {
  constructor(
    @InjectModel(Privilege) private readonly privilegeModel: typeof Privilege
  ) {}
  async getPrivilegeInfo(privilegeId: number) {
    const res = await this.privilegeModel.findOne({
      include: [
        {
          model: Privilege
        }
      ],
      where: {
        privilegeId
      }
    })
    return success(res)
  }
}

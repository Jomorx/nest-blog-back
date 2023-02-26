import { HttpStatus, Injectable } from "@nestjs/common"
import { LoginDto } from "../dto/loginDto"
import { Manager, ManagerGroupRole, Role, RolePrivilege } from "src/model"
import { success } from "src/utils/R"
import { AppException } from "src/filter/appException"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/sequelize"
@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Manager) private readonly managerModel: typeof Manager,
    @InjectModel(ManagerGroupRole)
    private readonly mangerGroupRoleModel: typeof ManagerGroupRole,
    @InjectModel(RolePrivilege)
    private readonly rolePrivilegeModel: typeof RolePrivilege
  ) {}
  async getManagerInfo(loginDto: LoginDto) {
    const manager = await this.managerModel.findOne({
      where: [{ account: loginDto.account }, { password: loginDto.password }]
    })
    if (manager === null) {
      throw new AppException(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED")
    }
    const { account, password, nickname, groupId } = manager
    //获取用户组对应的角色
    // const managerRoles = await this.mangerGroupRoleModel.findAll({
    //   include: [
    //     {
    //       model: Role,
    //       attributes: ["roleId", "roleName"]
    //     }
    //   ],
    //   where: { groupId },
    //   attributes: []
    // })
    // this.managerModel
    // //转换为role
    // const roles: Role[] = managerRoles.map((item) => item.role)
    // let privileges = null
    // //查询用户组
    // for (const role of roles) {
    //   privileges = await this.rolePrivilegeModel.findOne({
    //     where: { roleId: role.roleId }
    //   })
    // }
    return success({
      token: this.jwtService.sign({ account, password }, { expiresIn: "30d" }),
      account,
      nickname
      // groupId,
      // roles,
      // privileges
    })
  }
}

import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { jwtConfig } from "src/config/jwtConfig"
import { AppException } from "src/filter/appException"
const authDesc = {
  isLogin(reflector: Reflector, context: ExecutionContext, req: Request) {
    const res = reflector.get("noLogin", context.getHandler())
    if (res === undefined) {
      try {
        //1. 获取authorization
        const { authorization } = req.headers
        //2. jwt校验
        const { account, password } = new JwtService().verify(authorization, {
          secret: jwtConfig.secret
        })
        //3. 通过校验
        return true
      } catch (e) {
        throw new AppException(403, "登录已过期")
      }
    }
    //不需要登录的请求
    return true
  },
  isAdmin(reflector: Reflector, context: ExecutionContext) {
    return true
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
    // ): boolean | Promise<boolean> | Observable<boolean> {
  ): boolean {
    const req = context.switchToHttp().getRequest()
    const { isLogin, isAdmin } = authDesc
    return (
      isLogin(this.reflector, context, req) && isAdmin(this.reflector, context)
    )
  }
}

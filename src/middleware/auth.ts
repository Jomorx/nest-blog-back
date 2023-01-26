import { JwtService } from "@nestjs/jwt"
import { AppException } from "src/filter/appException"

export const auth = (req: Request, res: Response, next) => {
  console.log("通过了中间件")
  try {
    const token = req.headers["Authorization"]
    const { account, password } = new JwtService().verify(token)
  } catch {
    throw new AppException(401, "登录已过期")
  }
  next()
}

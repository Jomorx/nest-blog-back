import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common"
import { Request, Response } from "express"
import { AppException } from "./appException"
@Catch(AppException)
export class AppExceptionFilter<T> implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()
    const status = exception.getCode()
    res.status(status).json({
      code: status,
      data: null,
      message: exception.getMessage()
    })
  }
}

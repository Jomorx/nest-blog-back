import { SetMetadata } from "@nestjs/common"
import { AnyFunction } from "sequelize/types/utils"

export const noLogin = (...args: string[]) => SetMetadata("noLogin", args)

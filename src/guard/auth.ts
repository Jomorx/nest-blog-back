import { SetMetadata } from "@nestjs/common"

export const noLogin = (...args: string[]) => SetMetadata("noLogin", args)

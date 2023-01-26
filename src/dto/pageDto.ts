import { Type } from "class-transformer"
import { IsInt } from "class-validator"

export class PageDto {
  @IsInt()
  @Type(() => Number)
  currentPage: number
  @IsInt()
  @Type(() => Number)
  pageSize: number
  @Type(() => String)
  searchText: string
}

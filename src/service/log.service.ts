import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Log } from "src/model/logModel"
import { success } from "src/utils/R"
import { ArticleTag } from "src/model/articleTagModel"
import { PageDto } from "src/dto/pageDto"
import { AppException } from "src/filter/appException"
import { Op } from "sequelize"
@Injectable()
export class LogService {
  constructor(@InjectModel(Log) private logModel: typeof Log) {}

  async getLogList(pageDto: PageDto) {
    let res: { rows?: Log[]; count?: number } = {}
    if (pageDto.searchText !== "") {
      res = await this.logModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize,
        where: { logContent: { [Op.like]: `%${pageDto.searchText}%` } }
      })
    } else {
      res = await this.logModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize
      })
    }
    return success(res)
  }
  async insertLog(logContent: string) {
    const res = await this.logModel.create(logContent)
    return success(res)
  }
  async deleteLogList(logList: number[]) {
    for (const id of logList) {
      await this.logModel.destroy({ where: { logId: id } })
    }
    return success(null)
  }

  async editLog(logId: number, logContent: string) {
    try {
      await this.logModel.update(
        { logContent },
        {
          where: { logId }
        }
      )
    } catch {
      throw new AppException(500, "更新异常")
    }
    return success(null)
  }
}

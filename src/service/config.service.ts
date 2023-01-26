import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Op } from "sequelize"
import { Config } from "src/model/configModel"
import { success } from "src/utils/R"

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel(Config) private readonly configModel: typeof Config
  ) {}
  async getConfigById(id: number) {
    const res = await this.configModel.findOne({
      where: { configId: id }
    })
    return success(res)
  }

  async insertConfig(configModel: Config) {
    const res = await this.configModel.create(configModel)
    return success(res)
  }
  async editConfig(configModel: Config) {
    const res = await this.configModel.update(configModel, {
      where: { configId: configModel.configId }
    })
    return success(res)
  }
}

import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Op } from "sequelize"
import { PageDto } from "src/dto/pageDto"
import { FriendChain } from "src/model/friendchainModel"
import { success } from "src/utils/R"

@Injectable()
export class FriendChainService {
  constructor(
    @InjectModel(FriendChain)
    private readonly friendChainModel: typeof FriendChain
  ) {}
  async getFriendChainList(pageDto: PageDto) {
    let res: { rows?: FriendChain[]; count?: number } = {}
    if (pageDto.searchText !== "") {
      res = await this.friendChainModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize,
        where: { friendChainName: { [Op.like]: `%${pageDto.searchText}%` } }
      })
    } else {
      res = await this.friendChainModel.findAndCountAll({
        limit: pageDto.pageSize,
        offset: (pageDto.currentPage - 1) * pageDto.pageSize
      })
    }
    return success(res)
  }

  async deleteFriendChainList(friendChainList: number[]) {
    console.log(friendChainList)
    for (const item of friendChainList) {
      await this.friendChainModel.destroy({ where: { friendChainId: item } })
    }
    return success(null)
  }
  async insertFriendChain(friendChainModel: FriendChain) {
    const res = await this.friendChainModel.create(friendChainModel)
    return success(res)
  }
  async editFriendChain(friendChainModel: FriendChain) {
    const res = await this.friendChainModel.update(friendChainModel, {
      where: { friendChainId: friendChainModel.friendChainId }
    })
    return success(res)
  }
}

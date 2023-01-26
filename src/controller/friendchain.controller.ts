import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { FriendChainService } from "src/service/friendchain.service"

@Controller("friendChain")
export class FriendChainController {
  constructor(private readonly friendChainService: FriendChainService) {}
  @Get("getFriendChainList")
  async getFriendChainList(@Query() pageDto: PageDto) {
    return await this.friendChainService.getFriendChainList(pageDto)
  }
  @Post("deleteFriendChainList")
  async deleteFriendChainList(@Body("friendChainList") friendChainList) {
    return await this.friendChainService.deleteFriendChainList(friendChainList)
  }
  @Post("insertFriendChain")
  async insertFriendChain(@Body() friendChainModel) {
    return await this.friendChainService.insertFriendChain(friendChainModel)
  }
  @Post("editFriendChain")
  async editFriendChain(@Body() friendChainModel) {
    return await this.friendChainService.editFriendChain(friendChainModel)
  }
}

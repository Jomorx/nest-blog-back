import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common"
import { PageDto } from "src/dto/pageDto"
import { noLogin } from "src/guard/auth"
import { AuthGuard } from "src/guard/authGuard"
import { FriendChainService } from "src/service/friendchain.service"

@Controller("friendChain")
@UseGuards(AuthGuard)
export class FriendChainController {
  constructor(private readonly friendChainService: FriendChainService) {}
  @Get("getFriendChainList")
  @noLogin()
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

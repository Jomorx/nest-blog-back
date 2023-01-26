import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"

@Table({ tableName: "bl_friend_chain" })
export class FriendChain extends Model<FriendChain> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: "friend_chain_id" })
  friendChainId: number
  @Column({ field: "friend_chain_name" })
  friendChainName: string
  @Column({ field: "friend_chain_description" })
  friendChainDescription: string
  @Column({ field: "friend_chain_avatar" })
  friendChainAvatar: string
  @Column({ field: "friend_chain_link" })
  friendChainLink: string
  @Column({ field: "created_at" })
  createdAt: Date
  @Column({ field: "updated_at" })
  updatedAt: Date
}

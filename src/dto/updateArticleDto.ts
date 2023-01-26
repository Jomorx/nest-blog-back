import { Tag } from "src/model/tagModel"

export class UpdateArticleDto {
  articleId: number
  articleTitle: string
  articleContent: string
  articleCover: string
  isTop: number
  viewCount: number
  tags: Tag[]
  categoryId: number
}

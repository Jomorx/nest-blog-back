import { Injectable } from "@nestjs/common"
import { ArrayBuffer } from "spark-md5"
import { ImageFileDto } from "src/dto/imageFileDto"
import aliOss from "ali-oss"
import { success } from "src/utils/R"
import { config } from "../config/oss"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OSS = require("ali-oss")
@Injectable()
export class UploadService {
  private spark: ArrayBuffer
  private client: aliOss
  constructor() {
    this.spark = new ArrayBuffer()
    this.client = new OSS(config.client)
  }
  async uploadImage({ file, fileName }: ImageFileDto) {
    const originFile = decodeURIComponent(file)
    const base64 = originFile.split(",").pop()
    const suffix = originFile.split(";")[0].split("/")[1]
    const buffer = Buffer.from(base64, "base64")
    this.spark.append(buffer)
    const objectKey = `images/${this.spark.end()}.` + suffix

    try {
      const { res } = await this.isExist(objectKey)
      return success({ url: (res as any).requestUrls[0] })
    } catch (e) {
      const res = await this.client.put(objectKey, buffer)
      return success({ url: res.url })
    }
  }
  private isExist(objectKey: string) {
    return this.client.head(objectKey, {})
  }
}

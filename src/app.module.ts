import { OSSModule } from "@nest-public/nest-oss"
import { MiddlewareConsumer, Module } from "@nestjs/common"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { jwtKey } from "./auth/config"
import { auth } from "./middleware/auth"
import { config } from "./config/oss"
import * as services from "./service"
import * as controllers from "./controller"
import { ISequelizeModule, ISequelizeModuleForFeature } from "./config/db"
@Module({
  imports: [
    ISequelizeModule,
    ISequelizeModuleForFeature,
    JwtModule.register({
      //生成token的key
      secret: jwtKey.secret,
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        //token的有效时长
        expiresIn: "1h"
      }
    }),
    OSSModule.forRoot(config)
  ],
  controllers: Object.values(controllers),
  providers: [...Object.values(services)]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(auth).exclude('/article/getArticleList').forRoutes('*');
  }
}

import { OSSModule } from "@nest-public/nest-oss"
import { MiddlewareConsumer, Module } from "@nestjs/common"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { jwtConfig } from "./config/jwtConfig"
import { auth } from "./middleware/auth"
import { config } from "./config/oss"
import * as services from "./service"
import * as controllers from "./controller"
import { ISequelizeModule, ISequelizeModuleForFeature } from "./config/db"
@Module({
  imports: [
    ISequelizeModule,
    ISequelizeModuleForFeature,
    JwtModule.register(jwtConfig),
    OSSModule.forRoot(config)
  ],
  controllers: Object.values(controllers),
  providers: Object.values(services)
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   const controllerNames = Object.keys(controllers).map((key) => {
  //     const controllerName = key.replace("Controller", "")
  //     return controllerName[0].toLowerCase() + controllerName.slice(1) + "/(.*)"
  //   })
  //   consumer
  //     .apply(auth)
  //     .exclude(...controllerNames)
  //     .forRoutes("*")
  // }
}

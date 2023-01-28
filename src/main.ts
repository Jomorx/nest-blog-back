import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { AppExceptionFilter } from "./filter/http-exception.filter"
import { auth } from "./middleware/auth"
import { urlencoded, json } from "express"
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AppExceptionFilter())
  // app.use(auth);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(json({ limit: "50mb" }))
  app.use(urlencoded({ extended: true, limit: "50mb" }))
  app.enableCors()
  await app.listen(3000)
}
bootstrap()

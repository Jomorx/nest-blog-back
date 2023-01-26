import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { AppExceptionFilter } from "./filter/http-exception.filter"
import { auth } from "./middleware/auth"
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AppExceptionFilter())
  // app.use(auth);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.enableCors()
  await app.listen(3000)
}
bootstrap()

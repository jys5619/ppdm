import { NestFactory } from '@nestjs/core';
import { PpdmModule } from './ppdm.module';
import { SwaggerSetup } from './share/config/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(PpdmModule);
  app.enableCors({
    origin: ['https://www.example.shop', 'http://localhost:5173'],
    credentials: true,
    exposedHeaders: ['Authorization'], // * 사용할 헤더 추가.
  });
  app.setGlobalPrefix('api');
  SwaggerSetup(app);

  await app.listen(3000);
}
bootstrap();

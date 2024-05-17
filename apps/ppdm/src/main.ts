import { NestFactory } from '@nestjs/core';
import { PpdmModule } from './ppdm.module';
import { SwaggerSetup } from './share/config/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(PpdmModule);

  app.setGlobalPrefix('api');
  SwaggerSetup(app);

  await app.listen(3000);
}
bootstrap();

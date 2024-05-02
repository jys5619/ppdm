import { NestFactory } from '@nestjs/core';
import { PpdmAdminModule } from './ppdm-admin.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PpdmAdminModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PPDM Admin')
    .setDescription('PPDM Admin CRUD')
    .setVersion('1.0')
    .addTag('ppdm')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();

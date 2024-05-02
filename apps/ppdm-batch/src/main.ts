import { NestFactory } from '@nestjs/core';
import { PpdmBatchModule } from './ppdm-batch.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PpdmBatchModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PPDM Batch')
    .setDescription('PPDM Batch CRUD')
    .setVersion('1.0')
    .addTag('ppdm')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import SystemUtil from '../util/system.util';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function SwaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(SystemUtil.getInstance().env.project.name)
    .setDescription(SystemUtil.getInstance().env.project.description)
    .setVersion(SystemUtil.getInstance().env.project.version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const options: SwaggerDocumentOptions = {
    // operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('swagger', app, document);
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyEnum } from './configuration/config-key.enum';
import { AppConfig } from './configuration/configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder().setVersion('1.0').addTag('cats').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  const appConfig = app
    .get(ConfigService)
    .getOrThrow<AppConfig>(ConfigKeyEnum.app);

  await app.listen(appConfig.port);
}
bootstrap();

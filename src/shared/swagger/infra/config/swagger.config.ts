import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  private static instance: SwaggerConfig;

  private constructor() {}

  public static getInstance(): SwaggerConfig {
    if (!SwaggerConfig.instance) {
      SwaggerConfig.instance = new SwaggerConfig();
    }
    return SwaggerConfig.instance;
  }

  public setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('Teddy API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}

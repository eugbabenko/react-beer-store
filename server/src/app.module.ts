import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeersModule } from './modules/api/beers/beers.module';
import { OrderModule } from './modules/api/orders/order.module';
import { LoggingModule } from './modules/logger';
import { CorrelationIDInterceptor } from './modules/logger/correlation-id.interceptor';
import { RequestContextMiddleware } from './modules/logger/request-context.middleware';

@Module({
  imports: [
    LoggingModule,
    BeersModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'data'),
      serveRoot: '/public',
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIDInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        skipMissingProperties: false,
        whitelist: true,
      }),
    },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}

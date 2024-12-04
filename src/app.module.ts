import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

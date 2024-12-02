import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
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

import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from './domain/interfaces';
import { AuthService } from './application/services';
import { AuthenticateUseCase } from './application/use-cases';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    AuthenticateUseCase,
  ],
})
export class AuthModule {}

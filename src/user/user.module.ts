import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities';
import { UserController } from './presentation/controllers/user.controller';
import { USER_REPOSITORY } from './domain/interfaces';
import { UserRepository } from './infra/user.repository';
import { CreateUserUseCase } from './application/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    CreateUserUseCase,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { ClientController } from './presentation/controllers/client.controller';
import { CLIENT_REPOSITORY } from './domain/interfaces/client-repository.interface';
import { ClientRepository } from './infra/repositories/client.repository';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case';
import { GetClientsUseCase } from './application/use-cases/get-clients.use-case';
import { UpdateClientUseCase } from './application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from './application/use-cases/delete-client.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './domain/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientRepository,
    },
    CreateClientUseCase,
    GetClientsUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
  ],
})
export class ClientModule {}

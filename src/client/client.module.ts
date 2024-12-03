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
import { ClientMessageBroker } from './infra/brokers/client-message.broker';
import { CLIENT_MESSAGE_BROKER } from './domain/interfaces';
import { MESSAGE_BROKER } from '../shared/message-broker/domain/interfaces';
import { RabbitMQBroker } from '../shared/message-broker/infra/brokers/rabbit-mq.broker';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientRepository,
    },
    {
      provide: CLIENT_MESSAGE_BROKER,
      useClass: ClientMessageBroker,
    },
    {
      provide: MESSAGE_BROKER,
      useClass: RabbitMQBroker,
    },
    CreateClientUseCase,
    GetClientsUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
  ],
})
export class ClientModule {}

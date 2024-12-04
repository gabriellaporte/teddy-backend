import { Module, OnModuleInit } from '@nestjs/common';
import { ClientController } from './presentation/controllers/client.controller';
import { CLIENT_REPOSITORY } from './domain/interfaces/client-repository.interface';
import { ClientRepository } from './infra/repositories/client.repository';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case';
import { GetClientsUseCase } from './application/use-cases/get-clients.use-case';
import { UpdateClientUseCase } from './application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from './application/use-cases/delete-client.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './domain/entities';
import { ClientMessageBroker } from './application/brokers/client-message.broker';
import { CLIENT_MESSAGE_BROKER } from './domain/interfaces';
import { MESSAGE_BROKER } from '../shared/message-broker/domain/interfaces';
import { RabbitMQClient } from '../shared/message-broker/infra/brokers/rabbit-mq.client';
import { ClientCreatedConsumer } from './application/brokers/consumers/client-created.consumer';
import { ClientUpdatedConsumer } from './application/brokers/consumers/client-updated.consumer';
import { ClientDeletedConsumer } from './application/brokers/consumers/client-deleted.consumer';
import { GetTotalClientPagesUseCase } from './application/use-cases/get-total-client-pages.use-case';

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
      useClass: RabbitMQClient,
    },
    CreateClientUseCase,
    GetClientsUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
    GetTotalClientPagesUseCase,
    ClientCreatedConsumer,
    ClientUpdatedConsumer,
    ClientDeletedConsumer,
  ],
})
export class ClientModule implements OnModuleInit {
  constructor(
    private readonly clientCreatedConsumer: ClientCreatedConsumer,
    private readonly clientUpdatedConsumer: ClientUpdatedConsumer,
    private readonly clientDeletedConsumer: ClientDeletedConsumer,
  ) {}

  async onModuleInit() {
    await this.clientCreatedConsumer.listen();
    await this.clientUpdatedConsumer.listen();
    await this.clientDeletedConsumer.listen();
  }
}

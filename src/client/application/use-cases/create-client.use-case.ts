import { Inject, Injectable } from '@nestjs/common';
import {
  CLIENT_MESSAGE_BROKER,
  IClientMessageBroker,
  IClientRepository,
} from '../../domain/interfaces';
import { CreateClientDTO } from '../../presentation/dtos';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface';
import { ClientCreatedEvent } from '../../domain/events/';
import { Client } from '../../domain/entities';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
    @Inject(CLIENT_MESSAGE_BROKER)
    private readonly clientMessageBroker: IClientMessageBroker,
  ) {}

  async execute(data: CreateClientDTO) {
    const client = await this.clientRepository.create(data);
    await this.publishClientCreatedEvent(client);
    return client;
  }

  private async publishClientCreatedEvent(client: Client) {
    const event = new ClientCreatedEvent(client);
    await this.clientMessageBroker.publishClientCreated(event);
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CLIENT_MESSAGE_BROKER,
  IClientMessageBroker,
  IClientRepository,
} from '../../domain/interfaces';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface';
import { Client } from '../../domain/entities';
import { ClientDeletedEvent } from '../../domain/events';

@Injectable()
export class DeleteClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
    @Inject(CLIENT_MESSAGE_BROKER)
    private readonly clientMessageBroker: IClientMessageBroker,
  ) {}

  async execute(id: string) {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado!');
    }
    await this.clientRepository.delete(id);
    await this.publishEvent(client);
  }

  private async publishEvent(client: Client) {
    const event = new ClientDeletedEvent(client);
    await this.clientMessageBroker.publishClientDeleted(event);
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CLIENT_MESSAGE_BROKER,
  IClientMessageBroker,
  IClientRepository,
} from '../../domain/interfaces';
import { UpdateClientDTO } from '../../presentation/dtos';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface';
import { Client } from '../../domain/entities';
import { ClientUpdatedEvent } from '../../domain/events';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
    @Inject(CLIENT_MESSAGE_BROKER)
    private readonly clientMessageBroker: IClientMessageBroker,
  ) {}

  async execute(id: string, data: UpdateClientDTO) {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado!');
    }
    const updatedClient = await this.clientRepository.update(id, data);
    await this.publishEvent(client, updatedClient);
    return updatedClient;
  }

  private async publishEvent(previous: Client, updated: Client) {
    const event = new ClientUpdatedEvent(updated.id, previous, updated);
    await this.clientMessageBroker.publishClientUpdated(event);
  }
}

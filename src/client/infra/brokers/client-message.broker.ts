import { Inject, Injectable } from '@nestjs/common';
import {
  ClientCreatedEvent,
  ClientDeletedEvent,
  ClientUpdatedEvent,
} from '../../domain/events';
import {
  IMessageBroker,
  MESSAGE_BROKER,
} from '../../../shared/message-broker/domain/interfaces/';
import {
  CLIENT_EVENTS_EXCHANGE,
  IClientMessageBroker,
} from '../../domain/interfaces';

@Injectable()
export class ClientMessageBroker implements IClientMessageBroker {
  constructor(
    @Inject(MESSAGE_BROKER) private readonly messageBroker: IMessageBroker,
  ) {}

  async publishClientCreated(event: ClientCreatedEvent): Promise<void> {
    await this.messageBroker.publish(
      CLIENT_EVENTS_EXCHANGE,
      'client.created',
      event,
    );
  }

  async publishClientUpdated(event: ClientUpdatedEvent): Promise<void> {
    await this.messageBroker.publish(
      CLIENT_EVENTS_EXCHANGE,
      'client.updated',
      event,
    );
  }

  async publishClientDeleted(event: ClientDeletedEvent): Promise<void> {
    await this.messageBroker.publish(
      CLIENT_EVENTS_EXCHANGE,
      'client.deleted',
      event,
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageBroker,
  MESSAGE_BROKER,
} from '../../../../shared/message-broker/domain/interfaces';
import {
  CLIENT_CREATED_EVENT,
  CLIENT_CREATED_QUEUE,
  ClientCreatedEvent,
} from '../../../domain/events';
import { IMessageConsumer } from '../../../../shared/message-broker/domain/interfaces/message-consumer.interface';
import { CLIENT_EVENTS_EXCHANGE } from '../../../domain/interfaces';

@Injectable()
export class ClientCreatedConsumer implements IMessageConsumer {
  constructor(
    @Inject(MESSAGE_BROKER) private readonly messageBroker: IMessageBroker,
  ) {}

  async listen(): Promise<void> {
    await this.messageBroker.consume(
      CLIENT_CREATED_QUEUE,
      CLIENT_EVENTS_EXCHANGE,
      CLIENT_CREATED_EVENT,
      async (event: ClientCreatedEvent) => {
        console.log('Consumer de mensageria para criação de client');
        console.log('Evento recebido: ', event.client);
      },
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageBroker,
  MESSAGE_BROKER,
} from '../../../../shared/message-broker/domain/interfaces';
import {
  CLIENT_DELETED_EVENT,
  CLIENT_DELETED_QUEUE,
  ClientDeletedEvent,
} from '../../../domain/events';
import { IMessageConsumer } from '../../../../shared/message-broker/domain/interfaces/message-consumer.interface';
import { CLIENT_EVENTS_EXCHANGE } from '../../../domain/interfaces';

@Injectable()
export class ClientDeletedConsumer implements IMessageConsumer {
  constructor(
    @Inject(MESSAGE_BROKER) private readonly messageBroker: IMessageBroker,
  ) {}

  async listen(): Promise<void> {
    await this.messageBroker.consume(
      CLIENT_DELETED_QUEUE,
      CLIENT_EVENTS_EXCHANGE,
      CLIENT_DELETED_EVENT,
      async (event: ClientDeletedEvent) => {
        console.log(
          `Consumer de mensageria para deleção de client (#${event.client.id})`,
        );
        console.log('Client deletado: ', event.client);
      },
    );
  }
}

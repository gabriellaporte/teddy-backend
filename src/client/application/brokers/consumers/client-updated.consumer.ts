import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageBroker,
  MESSAGE_BROKER,
} from '../../../../shared/message-broker/domain/interfaces';
import {
  CLIENT_UPDATED_EVENT,
  CLIENT_UPDATED_QUEUE,
  ClientUpdatedEvent,
} from '../../../domain/events';
import { IMessageConsumer } from '../../../../shared/message-broker/domain/interfaces/message-consumer.interface';
import { CLIENT_EVENTS_EXCHANGE } from '../../../domain/interfaces';

@Injectable()
export class ClientUpdatedConsumer implements IMessageConsumer {
  constructor(
    @Inject(MESSAGE_BROKER) private readonly messageBroker: IMessageBroker,
  ) {}

  async listen(): Promise<void> {
    await this.messageBroker.consume(
      CLIENT_UPDATED_QUEUE,
      CLIENT_EVENTS_EXCHANGE,
      CLIENT_UPDATED_EVENT,
      async (event: ClientUpdatedEvent) => {
        console.log(
          `Consumer de mensageria para update de client (#${event.id})`,
        );
        console.log('Dados anteriores: ', event.previousState);
        console.log('Dados atualizados: ', event.updatedState);
      },
    );
  }
}

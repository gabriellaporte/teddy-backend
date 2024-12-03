import {
  ClientCreatedEvent,
  ClientDeletedEvent,
  ClientUpdatedEvent,
} from '../events';

export interface IClientMessageBroker {
  publishClientCreated(event: ClientCreatedEvent): Promise<void>;

  publishClientUpdated(event: ClientUpdatedEvent): Promise<void>;

  publishClientDeleted(event: ClientDeletedEvent): Promise<void>;
}

export const CLIENT_MESSAGE_BROKER = 'CLIENT_MESSAGE_BROKER';
export const CLIENT_EVENTS_EXCHANGE = 'client-events';

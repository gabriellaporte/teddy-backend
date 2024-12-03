import { Client } from '../entities';

export class ClientCreatedEvent {
  constructor(public readonly client: Client) {}
}

export const CLIENT_CREATED_QUEUE = 'client-created-queue';
export const CLIENT_CREATED_EVENT = 'client.created';

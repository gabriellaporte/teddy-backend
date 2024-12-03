import { Client } from '../entities';

export class ClientCreatedEvent {
  constructor(private readonly client: Client) {}
}

export const CLIENT_CREATED_EVENT = 'client.created';

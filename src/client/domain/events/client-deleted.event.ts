import { Client } from '../entities';

export class ClientDeletedEvent {
  constructor(public readonly client: Client) {}
}

export const CLIENT_DELETED_QUEUE = 'client-deleted-queue';
export const CLIENT_DELETED_EVENT = 'client.deleted';

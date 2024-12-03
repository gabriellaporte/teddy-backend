export class ClientDeletedEvent {
  constructor(public readonly id: string) {}
}

export const CLIENT_DELETED_EVENT = 'client.deleted';

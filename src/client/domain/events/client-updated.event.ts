export class ClientUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly updatedFields: Record<string, any>,
  ) {}
}

export const CLIENT_UPDATED_EVENT = 'client.updated';

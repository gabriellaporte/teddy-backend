export class ClientUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly previousState: Record<string, any>,
    public readonly updatedState: Record<string, any>,
  ) {}
}

export const CLIENT_UPDATED_QUEUE = 'client-updated-queue';
export const CLIENT_UPDATED_EVENT = 'client.updated';

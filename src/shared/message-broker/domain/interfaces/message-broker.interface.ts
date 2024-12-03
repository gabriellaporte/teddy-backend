export interface IMessageBroker {
  publish(exchange: string, routingKey: string, message: any): Promise<void>;

  consume(
    queue: string,
    exchange: string,
    routingKey: string,
    onMessage: (msg: any) => void,
  ): Promise<void>;
}

export const MESSAGE_BROKER = 'MESSAGE_BROKER';

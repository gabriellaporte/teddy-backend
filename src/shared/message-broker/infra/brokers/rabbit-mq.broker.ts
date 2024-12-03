import { Injectable, OnModuleInit } from '@nestjs/common';
import { Channel, connect, Connection } from 'amqplib';
import { IMessageBroker } from '../../domain/interfaces';

@Injectable()
export class RabbitMQBroker implements IMessageBroker, OnModuleInit {
  private connection: Connection;
  private channel: Channel;

  async onModuleInit(): Promise<void> {
    this.connection = await connect(
      `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
    );
    this.channel = await this.connection.createChannel();
  }

  async publish(
    exchange: string,
    routingKey: string,
    message: any,
  ): Promise<void> {
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
    );
  }

  async consume(
    queue: string,
    exchange: string,
    routingKey: string,
    onMessage: (msg: any) => void,
  ): Promise<void> {
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKey);
    this.channel.consume(queue, (msg: any) => {
      if (msg) {
        onMessage(JSON.parse(msg.content.toString()));
        this.channel.ack(msg);
      }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../domain/entities';
import { IClientRepository } from '../../domain/interfaces';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(data: Partial<Client>): Promise<Client> {
    const client = this.clientRepository.create(data);
    return await this.clientRepository.save(client);
  }

  async findAll({
    perPage,
    page,
  }: IClientRepository.Pagination): Promise<Client[]> {
    return await this.clientRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  async findById(id: string): Promise<Client | null> {
    return await this.clientRepository.findOneBy({ id });
  }

  async getTotalPages(perPage: number): Promise<number> {
    const total = await this.clientRepository.count();
    return Math.ceil(total / perPage);
  }

  async update(id: string, data: Partial<Client>): Promise<Client> {
    await this.clientRepository.update(id, data);
    return await this.clientRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
}

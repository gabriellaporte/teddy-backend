import { Client } from '../entities';

export interface IClientRepository {
  create(data: Partial<Client>): Promise<Client>;

  findAll(pagination: IClientRepository.Pagination): Promise<Client[]>;

  getTotalPages(perPage: number): Promise<number>;

  findById(id: string): Promise<Client | null>;

  update(id: string, data: Partial<Client>): Promise<Client>;

  delete(id: string): Promise<void>;
}

export const CLIENT_REPOSITORY = 'IClientRepository';

export namespace IClientRepository {
  export type Pagination = {
    perPage: number;
    page: number;
  };
}

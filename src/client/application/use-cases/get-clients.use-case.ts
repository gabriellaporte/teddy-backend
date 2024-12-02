import { Inject, Injectable } from '@nestjs/common';
import { IClientRepository } from '../../domain/interfaces';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface';

@Injectable()
export class GetClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(pagination: IClientRepository.Pagination) {
    return await this.clientRepository.findAll(pagination);
  }
}

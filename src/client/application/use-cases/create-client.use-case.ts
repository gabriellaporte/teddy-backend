import { Inject, Injectable } from '@nestjs/common';
import { IClientRepository } from '../../domain/interfaces';
import { CreateClientDTO } from '../../presentation/dtos';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(data: CreateClientDTO) {
    return await this.clientRepository.create(data);
  }
}

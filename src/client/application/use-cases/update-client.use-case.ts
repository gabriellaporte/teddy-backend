import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientRepository } from '../../domain/interfaces';
import { UpdateClientDTO } from '../../presentation/dtos';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string, data: UpdateClientDTO) {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado!');
    }
    return await this.clientRepository.update(id, data);
  }
}

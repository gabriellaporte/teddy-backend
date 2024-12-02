import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientRepository } from '../../domain/interfaces';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface';

@Injectable()
export class DeleteClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string) {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Houve um erro ao deletar o cliente');
    }
    await this.clientRepository.delete(id);
  }
}

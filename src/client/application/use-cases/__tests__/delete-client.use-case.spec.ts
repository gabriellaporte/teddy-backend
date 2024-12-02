import { Test, TestingModule } from '@nestjs/testing';
import { DeleteClientUseCase } from '../delete-client.use-case';
import { IClientRepository } from '../../../domain/interfaces';
import { CLIENT_REPOSITORY } from '../../../domain/interfaces/client-repository.interface';
import { NotFoundException } from '@nestjs/common';

describe('DeleteClientUseCase', () => {
  let useCase: DeleteClientUseCase;
  let clientRepository: jest.Mocked<IClientRepository>;

  beforeEach(async () => {
    const mockClientRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClientUseCase,
        {
          provide: CLIENT_REPOSITORY,
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteClientUseCase>(DeleteClientUseCase);
    clientRepository = module.get(CLIENT_REPOSITORY);
  });

  it('should call clientRepository.findById and clientRepository.delete with the correct id', async () => {
    const clientId = '123';
    const mockClient = {
      id: clientId,
      name: 'John Doe',
      monthlyIncome: 50000,
      businessValuation: 500000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    clientRepository.findById.mockResolvedValue(mockClient);

    await useCase.execute(clientId);

    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(clientRepository.findById).toHaveBeenCalledWith(clientId);
    expect(clientRepository.delete).toHaveBeenCalledTimes(1);
    expect(clientRepository.delete).toHaveBeenCalledWith(clientId);
  });

  it('should throw NotFoundException if clientRepository.findById returns null', async () => {
    const clientId = '123';
    clientRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(clientId)).rejects.toThrow(NotFoundException);
    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(clientRepository.findById).toHaveBeenCalledWith(clientId);
    expect(clientRepository.delete).not.toHaveBeenCalled();
  });
});

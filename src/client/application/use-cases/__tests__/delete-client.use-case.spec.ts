import { Test, TestingModule } from '@nestjs/testing';
import { DeleteClientUseCase } from '../delete-client.use-case';
import { IClientRepository } from '../../../domain/interfaces';
import { CLIENT_REPOSITORY } from '../../../domain/interfaces/client-repository.interface';
import { CLIENT_MESSAGE_BROKER } from '../../../domain/interfaces/';
import { NotFoundException } from '@nestjs/common';

describe('DeleteClientUseCase', () => {
  let useCase: DeleteClientUseCase;
  let clientRepository: jest.Mocked<IClientRepository>;
  let clientMessageBroker: jest.Mocked<any>;

  beforeEach(async () => {
    const mockClientRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const mockClientMessageBroker = {
      publishClientDeleted: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClientUseCase,
        {
          provide: CLIENT_REPOSITORY,
          useValue: mockClientRepository,
        },
        {
          provide: CLIENT_MESSAGE_BROKER,
          useValue: mockClientMessageBroker,
        },
      ],
    }).compile();

    useCase = module.get<DeleteClientUseCase>(DeleteClientUseCase);
    clientRepository = module.get(CLIENT_REPOSITORY);
    clientMessageBroker = module.get(CLIENT_MESSAGE_BROKER);
  });

  it('should call functions with the correct id', async () => {
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
    expect(clientMessageBroker.publishClientDeleted).toHaveBeenCalledTimes(1);

    expect(clientMessageBroker.publishClientDeleted).toHaveBeenCalledWith(
      expect.objectContaining({
        client: expect.objectContaining({
          id: mockClient.id,
          name: mockClient.name,
          monthlyIncome: mockClient.monthlyIncome,
          businessValuation: mockClient.businessValuation,
          createdAt: mockClient.createdAt,
          updatedAt: mockClient.updatedAt,
        }),
      }),
    );
  });

  it('should throw NotFoundException if clientRepository.findById returns null', async () => {
    const clientId = '123';
    clientRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(clientId)).rejects.toThrow(NotFoundException);
    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(clientRepository.findById).toHaveBeenCalledWith(clientId);
    expect(clientRepository.delete).not.toHaveBeenCalled();
    expect(clientMessageBroker.publishClientDeleted).not.toHaveBeenCalled();
  });
});

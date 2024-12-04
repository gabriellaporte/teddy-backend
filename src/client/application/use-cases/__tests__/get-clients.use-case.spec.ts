import { Test, TestingModule } from '@nestjs/testing';
import { GetClientsUseCase } from '../get-clients.use-case';
import { IClientRepository } from '../../../domain/interfaces';
import { CLIENT_REPOSITORY } from '../../../domain/interfaces/client-repository.interface';

describe('GetClientsUseCase', () => {
  let useCase: GetClientsUseCase;
  let clientRepository: jest.Mocked<IClientRepository>;

  beforeEach(async () => {
    const mockClientRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetClientsUseCase,
        {
          provide: CLIENT_REPOSITORY,
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetClientsUseCase>(GetClientsUseCase);
    clientRepository = module.get(CLIENT_REPOSITORY);
  });

  it('should call clientRepository.findAll with the correct pagination parameters', async () => {
    const pagination = { page: 1, perPage: 10 };
    const mockClients = [
      {
        id: '1',
        name: 'John Doe',
        monthlyIncome: 5000,
        businessValuation: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Jane Doe',
        monthlyIncome: 5000,
        businessValuation: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    clientRepository.findAll.mockResolvedValue(mockClients);

    const result = await useCase.execute(pagination);

    // Assert
    expect(clientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(clientRepository.findAll).toHaveBeenCalledWith(pagination);
    expect(result).toEqual(mockClients);
  });
});

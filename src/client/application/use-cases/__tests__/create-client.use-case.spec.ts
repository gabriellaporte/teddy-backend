import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUseCase } from '../create-client.use-case';
import { IClientRepository } from '../../../domain/interfaces';
import { CreateClientDTO } from '../../../presentation/dtos';
import { CLIENT_REPOSITORY } from '../../../domain/interfaces/client-repository.interface';

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase;
  let clientRepository: jest.Mocked<IClientRepository>;

  beforeEach(async () => {
    const mockClientRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUseCase,
        {
          provide: CLIENT_REPOSITORY, // Use o token correto
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateClientUseCase>(CreateClientUseCase);
    clientRepository = module.get(CLIENT_REPOSITORY);
  });

  it('should call clientRepository.create with the correct data', async () => {
    const dto: CreateClientDTO = {
      name: 'John Doe',
      monthlyIncome: 50000,
      businessValuation: 500000,
    };

    const expectedResponse = {
      id: '123',
      name: 'John Doe',
      monthlyIncome: 50000,
      businessValuation: 500000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    clientRepository.create.mockResolvedValue(expectedResponse);

    const result = await useCase.execute(dto);

    expect(clientRepository.create).toHaveBeenCalledTimes(1);
    expect(clientRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });
});

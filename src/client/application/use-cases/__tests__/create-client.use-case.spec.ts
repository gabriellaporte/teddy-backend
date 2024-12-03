import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUseCase } from '../create-client.use-case';
import {
  CLIENT_MESSAGE_BROKER,
  IClientRepository,
} from '../../../domain/interfaces';
import { CLIENT_REPOSITORY } from '../../../domain/interfaces/client-repository.interface';
import { CreateClientDTO } from '../../../presentation/dtos';

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase;
  let clientRepository: jest.Mocked<IClientRepository>;
  let clientMessageBroker: jest.Mocked<any>;

  beforeEach(async () => {
    const mockClientRepository = {
      create: jest.fn(),
    };

    const mockClientMessageBroker = {
      publishClientCreated: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUseCase,
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

    useCase = module.get<CreateClientUseCase>(CreateClientUseCase);
    clientRepository = module.get(CLIENT_REPOSITORY);
    clientMessageBroker = module.get(CLIENT_MESSAGE_BROKER);
  });

  it('should call clientRepository.create and clientMessageBroker.publishClientCreated with the correct data', async () => {
    const dto: CreateClientDTO = {
      name: 'John Doe',
      monthlyIncome: 50000,
      businessValuation: 500000,
    };

    const createdClient = {
      id: '123',
      name: 'John Doe',
      monthlyIncome: 50000,
      businessValuation: 500000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    clientRepository.create.mockResolvedValue(createdClient);

    const result = await useCase.execute(dto);

    expect(clientRepository.create).toHaveBeenCalledTimes(1);
    expect(clientRepository.create).toHaveBeenCalledWith(dto);
    expect(clientMessageBroker.publishClientCreated).toHaveBeenCalledTimes(1);

    // Verifica o formato do evento enviado
    expect(clientMessageBroker.publishClientCreated).toHaveBeenCalledWith(
      expect.objectContaining({
        client: expect.objectContaining({
          id: createdClient.id,
          name: createdClient.name,
          monthlyIncome: createdClient.monthlyIncome,
          businessValuation: createdClient.businessValuation,
          createdAt: createdClient.createdAt,
          updatedAt: createdClient.updatedAt,
        }),
      }),
    );

    expect(result).toEqual(createdClient);
  });
});

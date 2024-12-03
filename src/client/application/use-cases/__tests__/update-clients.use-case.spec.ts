import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClientUseCase } from '../update-client.use-case';
import { IClientRepository } from '../../../domain/interfaces';
import { UpdateClientDTO } from '../../../presentation/dtos';
import { CLIENT_REPOSITORY } from '../../../domain/interfaces/client-repository.interface';
import { CLIENT_MESSAGE_BROKER } from '../../../domain/interfaces/client-message-broker.interface';
import { NotFoundException } from '@nestjs/common';

describe('UpdateClientUseCase', () => {
  let useCase: UpdateClientUseCase;
  let clientRepository: jest.Mocked<IClientRepository>;
  let clientMessageBroker: jest.Mocked<any>;

  beforeEach(async () => {
    const mockClientRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    const mockClientMessageBroker = {
      publishClientUpdated: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientUseCase,
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

    useCase = module.get<UpdateClientUseCase>(UpdateClientUseCase);
    clientRepository = module.get(CLIENT_REPOSITORY);
    clientMessageBroker = module.get(CLIENT_MESSAGE_BROKER);
  });

  it('should call functions with correct parameters', async () => {
    const clientId = '123';
    const updateData: UpdateClientDTO = {
      name: 'John Updated',
      monthlyIncome: 60000,
      businessValuation: 800000,
    };
    const existingClient = {
      id: clientId,
      name: 'John Doe',
      monthlyIncome: 50000,
      businessValuation: 700000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedClient = {
      id: clientId,
      name: updateData.name,
      monthlyIncome: updateData.monthlyIncome,
      businessValuation: updateData.businessValuation,
      createdAt: existingClient.createdAt,
      updatedAt: new Date(),
    };

    clientRepository.findById.mockResolvedValue(existingClient);
    clientRepository.update.mockResolvedValue(updatedClient);

    const result = await useCase.execute(clientId, updateData);

    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(clientRepository.findById).toHaveBeenCalledWith(clientId);
    expect(clientRepository.update).toHaveBeenCalledTimes(1);
    expect(clientRepository.update).toHaveBeenCalledWith(clientId, updateData);
    expect(clientMessageBroker.publishClientUpdated).toHaveBeenCalledTimes(1);

    expect(clientMessageBroker.publishClientUpdated).toHaveBeenCalledWith(
      expect.objectContaining({
        id: clientId,
        previousState: expect.objectContaining({
          id: existingClient.id,
          name: existingClient.name,
          monthlyIncome: existingClient.monthlyIncome,
          businessValuation: existingClient.businessValuation,
          createdAt: existingClient.createdAt,
          updatedAt: existingClient.updatedAt,
        }),
        updatedState: expect.objectContaining({
          id: updatedClient.id,
          name: updatedClient.name,
          monthlyIncome: updatedClient.monthlyIncome,
          businessValuation: updatedClient.businessValuation,
          createdAt: updatedClient.createdAt,
          updatedAt: updatedClient.updatedAt,
        }),
      }),
    );

    expect(result).toEqual(updatedClient);
  });

  it('should throw NotFoundException if clientRepository.findById returns null', async () => {
    const clientId = '123';
    const updateData: UpdateClientDTO = {
      name: 'John Updated',
      monthlyIncome: 60000,
      businessValuation: 800000,
    };

    clientRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(clientId, updateData)).rejects.toThrow(
      NotFoundException,
    );
    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(clientRepository.findById).toHaveBeenCalledWith(clientId);
    expect(clientRepository.update).not.toHaveBeenCalled();
    expect(clientMessageBroker.publishClientUpdated).not.toHaveBeenCalled();
  });
});

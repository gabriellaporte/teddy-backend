import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClientUseCase } from '../update-client.use-case';
import { IClientRepository } from '../../../domain/interfaces';
import { UpdateClientDTO } from '../../../presentation/dtos';
import { CLIENT_REPOSITORY } from '../../../domain/interfaces/client-repository.interface';
import { NotFoundException } from '@nestjs/common';

describe('UpdateClientUseCase', () => {
  let useCase: UpdateClientUseCase;
  let clientRepository: jest.Mocked<IClientRepository>;

  beforeEach(async () => {
    const mockClientRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientUseCase,
        {
          provide: CLIENT_REPOSITORY,
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateClientUseCase>(UpdateClientUseCase);
    clientRepository = module.get(CLIENT_REPOSITORY);
  });

  it('should call clientRepository.findById and clientRepository.update with the correct parameters', async () => {
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
  });
});

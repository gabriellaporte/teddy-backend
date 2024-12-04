import { Test, TestingModule } from '@nestjs/testing';
import { ClientRepository } from '../client.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../../../domain/entities';

describe('ClientRepository', () => {
  let clientRepository: ClientRepository;
  let mockRepository: jest.Mocked<Repository<Client>>;

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientRepository,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepo,
        },
      ],
    }).compile();

    clientRepository = module.get<ClientRepository>(ClientRepository);
    mockRepository = module.get(getRepositoryToken(Client));
  });

  it('should create and save a client', async () => {
    const clientData: Partial<Client> = {
      name: 'John Doe',
      monthlyIncome: 5000,
      businessValuation: 100000,
    };
    const savedClient: Client = {
      id: '1',
      ...clientData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Client;
    mockRepository.create.mockReturnValue(clientData as Client);
    mockRepository.save.mockResolvedValue(savedClient);

    const result = await clientRepository.create(clientData);

    expect(mockRepository.create).toHaveBeenCalledWith(clientData);
    expect(mockRepository.save).toHaveBeenCalledWith(clientData);
    expect(result).toEqual(savedClient);
  });

  it('should find all clients with pagination', async () => {
    const clients: Client[] = [
      {
        id: '1',
        name: 'John Doe',
        monthlyIncome: 5000,
        businessValuation: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Jane Doe',
        monthlyIncome: 7000,
        businessValuation: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockRepository.find.mockResolvedValue(clients);

    const pagination = { perPage: 10, page: 0 };

    const result = await clientRepository.findAll(pagination);

    expect(mockRepository.find).toHaveBeenCalledWith({
      skip: pagination.page,
      take: pagination.perPage,
    });
    expect(result).toEqual(clients);
  });

  it('should find a client by ID', async () => {
    const clientId = '1';
    const client: Client = {
      id: clientId,
      name: 'John Doe',
      monthlyIncome: 5000,
      businessValuation: 100000,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Client;
    mockRepository.findOneBy.mockResolvedValue(client);

    const result = await clientRepository.findById(clientId);

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: clientId });
    expect(result).toEqual(client);
  });

  it('should update a client', async () => {
    const clientId = '1';
    const updateData: Partial<Client> = { name: 'John Updated' };
    const updatedClient: Client = {
      id: clientId,
      name: 'John Updated',
      monthlyIncome: 5000,
      businessValuation: 100000,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Client;
    const mockUpdateResult: UpdateResult = {
      raw: {},
      affected: 1,
      generatedMaps: [],
    };
    mockRepository.update.mockResolvedValue(mockUpdateResult);
    mockRepository.findOneBy.mockResolvedValue(updatedClient);

    const result = await clientRepository.update(clientId, updateData);

    expect(mockRepository.update).toHaveBeenCalledWith(clientId, updateData);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: clientId });
    expect(result).toEqual(updatedClient);
  });

  it('should delete a client', async () => {
    const clientId = '1';
    const mockDeleteResult: DeleteResult = {
      raw: {},
      affected: 1,
    };
    mockRepository.delete.mockResolvedValue(mockDeleteResult);

    await clientRepository.delete(clientId);

    expect(mockRepository.delete).toHaveBeenCalledWith(clientId);
  });
});

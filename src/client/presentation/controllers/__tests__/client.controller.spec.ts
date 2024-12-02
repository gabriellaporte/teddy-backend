import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../client.controller';
import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case';
import { GetClientsUseCase } from '../../../application/use-cases/get-clients.use-case';
import { UpdateClientUseCase } from '../../../application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '../../../application/use-cases/delete-client.use-case';
import {
  CreateClientDTO,
  PaginateClientsDTO,
  UpdateClientDTO,
} from '../../dtos';
import { ClientIdDTO } from '../../dtos/request/client-id.dto';

describe('ClientController', () => {
  let controller: ClientController;
  let createClientUseCase: CreateClientUseCase;
  let getClientsUseCase: GetClientsUseCase;
  let updateClientUseCase: UpdateClientUseCase;
  let deleteClientUseCase: DeleteClientUseCase;

  beforeEach(async () => {
    const mockCreateClientUseCase = { execute: jest.fn() };
    const mockGetClientsUseCase = { execute: jest.fn() };
    const mockUpdateClientUseCase = { execute: jest.fn() };
    const mockDeleteClientUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        { provide: CreateClientUseCase, useValue: mockCreateClientUseCase },
        { provide: GetClientsUseCase, useValue: mockGetClientsUseCase },
        { provide: UpdateClientUseCase, useValue: mockUpdateClientUseCase },
        { provide: DeleteClientUseCase, useValue: mockDeleteClientUseCase },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    createClientUseCase = module.get<CreateClientUseCase>(CreateClientUseCase);
    getClientsUseCase = module.get<GetClientsUseCase>(GetClientsUseCase);
    updateClientUseCase = module.get<UpdateClientUseCase>(UpdateClientUseCase);
    deleteClientUseCase = module.get<DeleteClientUseCase>(DeleteClientUseCase);
  });

  it('should call GetClientsUseCase with correct parameters', async () => {
    const query: PaginateClientsDTO = { limit: 5, offset: 10 };
    jest.spyOn(getClientsUseCase, 'execute').mockResolvedValue([]);

    await controller.findAll(query);

    expect(getClientsUseCase.execute).toHaveBeenCalledTimes(1);
    expect(getClientsUseCase.execute).toHaveBeenCalledWith(query);
  });

  it('should call CreateClientUseCase with correct parameters', async () => {
    const createData: CreateClientDTO = {
      name: 'John Doe',
      monthlyIncome: 5000,
      businessValuation: 100000,
    };
    const createdClient = {
      id: '123',
      name: 'John Doe',
      monthlyIncome: 5000,
      businessValuation: 100000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(createClientUseCase, 'execute').mockResolvedValue(createdClient);

    await controller.create(createData);

    expect(createClientUseCase.execute).toHaveBeenCalledTimes(1);
    expect(createClientUseCase.execute).toHaveBeenCalledWith(createData);
  });

  it('should call UpdateClientUseCase with correct parameters', async () => {
    const clientId = '123';
    const params: ClientIdDTO = { id: clientId };
    const updateData: UpdateClientDTO = {
      name: 'John Updated',
      monthlyIncome: 6000,
      businessValuation: 120000,
    };
    const updatedClient = {
      id: clientId,
      name: 'John Updated',
      monthlyIncome: 6000,
      businessValuation: 120000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(updateClientUseCase, 'execute').mockResolvedValue(updatedClient);

    await controller.update(params, updateData);

    expect(updateClientUseCase.execute).toHaveBeenCalledTimes(1);
    expect(updateClientUseCase.execute).toHaveBeenCalledWith(
      clientId,
      updateData,
    );
  });

  it('should call DeleteClientUseCase with correct parameters', async () => {
    const clientId = '123';
    const params: ClientIdDTO = { id: clientId };
    jest.spyOn(deleteClientUseCase, 'execute').mockResolvedValue();

    await controller.delete(params);

    expect(deleteClientUseCase.execute).toHaveBeenCalledTimes(1);
    expect(deleteClientUseCase.execute).toHaveBeenCalledWith(clientId);
  });
});

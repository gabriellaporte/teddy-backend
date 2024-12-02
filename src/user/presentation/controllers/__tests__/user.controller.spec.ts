import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateUserUseCase } from '../../../application/use-cases';
import { CreateUserDTO } from '../../dtos';
import { UserCreatedDTO } from '../../dtos/response/user-created.dto';

describe('UserController', () => {
  let controller: UserController;
  let mockCreateUserUseCase: jest.Mocked<CreateUserUseCase>;

  const mockUserInput = (): CreateUserDTO => ({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  });

  const mockUserResponse = (): UserCreatedDTO => ({
    message: 'Usuário criado com sucesso!',
    data: {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  beforeEach(async () => {
    mockCreateUserUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateUserUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CreateUserUseCase, useValue: mockCreateUserUseCase },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should call CreateUserUseCase with correct data', async () => {
    const userInput = mockUserInput();
    const userResponse = mockUserResponse();
    mockCreateUserUseCase.execute.mockResolvedValueOnce(userResponse.data);

    const result = await controller.createUser(userInput);

    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(userInput);
    expect(result).toEqual(userResponse);
  });
});

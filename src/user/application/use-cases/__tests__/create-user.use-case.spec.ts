import { CreateUserUseCase } from '../create-user.use-case';
import { ConflictException } from '@nestjs/common';
import { User } from '../../../domain/entities';
import * as bcrypt from 'bcryptjs';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepository: {
    findByEmail: jest.Mock<Promise<User | null>, [string]>;
    create: jest.Mock<Promise<User>, [Partial<User>]>;
  };

  const mockUserInput = () => ({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  });

  const mockExistingUser = () => ({
    id: '123',
    email: 'test@example.com',
    name: 'Existing User',
    password: 'hashed_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const mockCreatedUser = (input: any) => ({
    id: '123',
    ...input,
    password: 'hashed_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    useCase = new CreateUserUseCase(mockUserRepository as any);

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(async () => 'hashed_password');
  });

  it('should create a user successfully', async () => {
    const userInput = mockUserInput();
    const createdUser = mockCreatedUser(userInput);

    mockUserRepository.findByEmail.mockResolvedValueOnce(null);
    mockUserRepository.create.mockResolvedValueOnce(createdUser);

    const result = await useCase.execute(userInput);

    expect(result).toEqual(
      expect.objectContaining({ email: userInput.email, name: userInput.name }),
    );
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      userInput.email,
    );
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      ...userInput,
      password: 'hashed_password',
    });
  });

  it('should throw a ConflictException if email is already in use', async () => {
    const existingUser = mockExistingUser();
    mockUserRepository.findByEmail.mockResolvedValueOnce(existingUser);

    await expect(
      useCase.execute({
        email: existingUser.email,
        password: 'password123',
        name: 'Test User',
      }),
    ).rejects.toThrow(ConflictException);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      existingUser.email,
    );
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});

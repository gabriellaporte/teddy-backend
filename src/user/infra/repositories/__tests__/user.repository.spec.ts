import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../domain/entities';
import { CreateUserDTO } from '../../../presentation/dtos';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockTypeORMRepository: jest.Mocked<Repository<User>>;

  const mockUserInput = (): CreateUserDTO => ({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  });

  const mockUserEntity = (): User => ({
    id: '123',
    email: 'test@example.com',
    password: 'hashed_password',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(async () => {
    mockTypeORMRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockTypeORMRepository,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    it('should create and save a user successfully', async () => {
      const userInput = mockUserInput();
      const userEntity = mockUserEntity();
      mockTypeORMRepository.create.mockReturnValue(userEntity);
      mockTypeORMRepository.save.mockResolvedValue(userEntity);

      const result = await repository.create(userInput);

      expect(mockTypeORMRepository.create).toHaveBeenCalledWith(userInput);
      expect(mockTypeORMRepository.save).toHaveBeenCalledWith(userEntity);
      expect(result).toEqual(userEntity);
    });
  });

  describe('findByEmail', () => {
    it('should return a user when email exists', async () => {
      const email = 'test@example.com';
      const userEntity = mockUserEntity();
      mockTypeORMRepository.findOneBy.mockResolvedValueOnce(userEntity);

      const result = await repository.findByEmail(email);

      expect(mockTypeORMRepository.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toEqual(userEntity);
    });

    it('should return null when email does not exist', async () => {
      const email = 'nonexistent@example.com';
      mockTypeORMRepository.findOneBy.mockResolvedValueOnce(null);

      const result = await repository.findByEmail(email);

      expect(mockTypeORMRepository.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });
  });
});

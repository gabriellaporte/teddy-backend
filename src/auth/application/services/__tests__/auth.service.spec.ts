import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IUserRepository } from '../../../../user/domain/interfaces';
import { AuthenticateDto } from '../../../presentation/dtos';
import { User } from '../../../../user/domain/entities';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockJwtService: jest.Mocked<JwtService>;

  const mockUserInput = (): AuthenticateDto => ({
    email: 'test@example.com',
    password: 'password123',
  });

  const mockUserEntity = (): User => ({
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashed_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(async () => {
    mockUserRepository = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    mockJwtService = {
      sign: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'USER_REPOSITORY', useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return a user when credentials are valid', async () => {
      const userInput = mockUserInput();
      const userEntity = mockUserEntity();

      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      mockUserRepository.findByEmail.mockResolvedValueOnce(userEntity);

      const result = await authService.validateUser(userInput);

      expect(result).toEqual(userEntity);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        userInput.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        userInput.password,
        userEntity.password,
      );
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const userInput = mockUserInput();
      mockUserRepository.findByEmail.mockResolvedValueOnce(null);

      await expect(authService.validateUser(userInput)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        userInput.email,
      );
    });
  });

  describe('login', () => {
    it('should return an access token for a valid user', async () => {
      const userEntity = mockUserEntity();
      const accessToken = 'mocked_access_token';
      const jwtSecret = 'mocked_jwt_secret';
      process.env.JWT_SECRET = jwtSecret;

      mockJwtService.sign.mockReturnValueOnce(accessToken);
      const result = await authService.login(userEntity);

      expect(result).toEqual({ accessToken });
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        {
          email: userEntity.email,
          sub: userEntity.id,
        },
        { secret: jwtSecret },
      );
    });
  });
});

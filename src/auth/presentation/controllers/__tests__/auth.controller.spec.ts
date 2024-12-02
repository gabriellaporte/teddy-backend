import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthenticateUseCase } from '../../../application/use-cases';
import { AuthenticateDto } from '../../dtos';
import { AuthenticationSucessfulDTO } from '../../dtos/response/authentication-sucessful.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authenticateUseCase: AuthenticateUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthenticateUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authenticateUseCase = module.get<AuthenticateUseCase>(AuthenticateUseCase);
  });

  it('should call AuthenticateUseCase.execute with the correct data', async () => {
    const dto: AuthenticateDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const expectedResponse: AuthenticationSucessfulDTO = {
      accessToken: 'fake-token',
    };
    jest
      .spyOn(authenticateUseCase, 'execute')
      .mockResolvedValue(expectedResponse);

    const result = await controller.login(dto);

    expect(authenticateUseCase.execute).toHaveBeenCalledTimes(1);
    expect(authenticateUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toBe(expectedResponse);
  });
});

import { AuthenticateUseCase } from '../authenticate.use-case';
import { IAuthService } from '../../../domain/interfaces';
import { AuthenticateDto } from '../../../presentation/dtos';

describe('AuthenticateUseCase', () => {
  let useCase: AuthenticateUseCase;
  let mockAuthService: jest.Mocked<IAuthService>;

  beforeEach(() => {
    mockAuthService = {
      validateUser: jest.fn(),
      login: jest.fn(),
    } as unknown as jest.Mocked<IAuthService>;

    useCase = new AuthenticateUseCase(mockAuthService);
  });

  it('should call authService.validateUser with the correct data', async () => {
    const data: AuthenticateDto = { email: 'test', password: 'password' };
    const validatedUser = { id: 1, email: 'test' };
    mockAuthService.validateUser.mockResolvedValue(validatedUser);
    mockAuthService.login.mockResolvedValue({ accessToken: 'token' });

    await useCase.execute(data);

    expect(mockAuthService.validateUser).toHaveBeenCalledWith(data);
  });

  it('should call authService.login with the validated user', async () => {
    const data: AuthenticateDto = { email: 'test', password: 'password' };
    const validatedUser = { id: 1, username: 'test' };
    mockAuthService.validateUser.mockResolvedValue(validatedUser);
    mockAuthService.login.mockResolvedValue({ accessToken: 'token' });

    await useCase.execute(data);

    expect(mockAuthService.login).toHaveBeenCalledWith(validatedUser);
  });

  it('should return the token from authService.login', async () => {
    const data: AuthenticateDto = { email: 'test', password: 'password' };
    const validatedUser = { id: 1, email: 'test' };
    mockAuthService.validateUser.mockResolvedValue(validatedUser);
    const expectedToken = { accessToken: 'token' };
    mockAuthService.login.mockResolvedValue(expectedToken);

    const result = await useCase.execute(data);

    expect(result).toBe(expectedToken);
  });
});

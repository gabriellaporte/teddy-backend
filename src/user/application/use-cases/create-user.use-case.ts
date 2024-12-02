import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../../domain/interfaces';
import { User } from '../../domain/entities';
import { hash } from 'bcryptjs';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Já existe um usuário com este e-mail');
    }

    const hashedPassword = await hash(data.password, 10);
    return await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}

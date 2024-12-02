import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../../domain/interfaces';
import { hash } from 'typeorm/util/StringUtils';
import { UserEntity } from '../../domain/entities';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: Partial<UserEntity>): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = hash(data.password, { length: 12 });
    await this.userRepository.create({ ...data, password: hashedPassword });
  }
}

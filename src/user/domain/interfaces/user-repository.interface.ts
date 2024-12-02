import { UserEntity } from '../entities';

export interface IUserRepository {
  create(user: Partial<UserEntity>): Promise<UserEntity>;

  findByEmail(email: string): Promise<UserEntity | null>;
}

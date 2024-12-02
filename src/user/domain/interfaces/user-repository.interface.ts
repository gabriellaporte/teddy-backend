import { User } from '../entities';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;

  findByEmail(email: string): Promise<User | null>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';

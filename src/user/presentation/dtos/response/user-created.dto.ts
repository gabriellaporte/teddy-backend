import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/entities';

export class UserCreatedDTO {
  @ApiProperty({
    example: 'Usuário criado com sucesso!',
    description: 'Mensagem informativa',
  })
  message: string;

  @ApiProperty({
    example: new User({
      id: 'efd1ce74-ee72-4a25-9e04-ed0db91e63ed',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    description: 'Usuário criado',
  })
  data: User;
}

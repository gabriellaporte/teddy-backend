import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  @IsNotEmpty({ message: 'Você deve especificar o nome de usuário' })
  name: string;

  @ApiProperty({
    example: 'jonh@doe.com',
    description: 'Email do usuário',
  })
  @IsEmail({}, { message: 'Você deve especificar um e-mail válido.' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  @MinLength(6, {
    message: 'Você deve especificar uma senha de pelo menos 6 caracteres',
  })
  password: string;
}

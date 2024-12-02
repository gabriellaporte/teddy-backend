import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticateDto {
  @IsEmail({}, { message: 'Você deve especificar um e-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'Você deve especificar uma senha' })
  password: string;
}

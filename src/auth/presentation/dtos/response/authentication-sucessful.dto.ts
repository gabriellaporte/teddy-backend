import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationSucessfulDTO {
  @ApiProperty({
    example: 'jwt-token',
  })
  accessToken: string;
}

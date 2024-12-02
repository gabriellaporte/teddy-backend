import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClientIdDTO {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID do cliente',
  })
  @IsUUID(null, { message: 'Você deve especificar um ID de cliente válido' })
  id: string;
}

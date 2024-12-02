import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateClientsDTO {
  @ApiProperty({
    example: 10,
    description: 'Número de clientes por página',
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    example: 0,
    description: 'Página atual, começando de 0',
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  offset?: number;
}

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
  perPage?: number;

  @ApiProperty({
    example: 1,
    description: 'Página atual, começando de 1',
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number;
}

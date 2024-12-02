import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginateClientsDTO {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  offset?: number;
}

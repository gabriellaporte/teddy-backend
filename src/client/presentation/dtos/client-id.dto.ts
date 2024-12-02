import { IsUUID } from 'class-validator';

export class ClientIdDTO {
  @IsUUID(null, { message: 'Você deve especificar um ID de cliente válido' })
  id: string;
}

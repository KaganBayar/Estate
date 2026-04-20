import { Agent } from '../../../domain/entities/Agent/agent.schema'
import { Property } from '../../..//domain/entities/Property/property.schema';
import { CreateAgentDto } from '../../../presentation/dtos/Agent/create-agent-dto';
import { CreatePropertyDto } from '../../../presentation/dtos/Property/create-property-dto';
import { CreateDtoFor } from '../../../presentation/dtos/.Base/base-dtos';
import { UpdateDtoFor } from '../../../presentation/dtos/.Base/base-dtos';


export abstract class BaseRepository<T> {
  abstract findById(id: string): Promise<T | null>

  abstract create(data: CreateDtoFor<T>): Promise<T>;

  abstract delete(id: string): Promise<T>;

  abstract update(id: string, data: UpdateDtoFor<T>): Promise<T>;

  abstract findAll(): Promise<T[]>;
}


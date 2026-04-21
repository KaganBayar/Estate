import { CreateDtoFor, UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  create(data: CreateDtoFor<T>): Promise<T>;
  delete(id: string): Promise<T | null>;
  update(id: string, data: UpdateDtoFor<T>): Promise<T | null>;
  findAll(): Promise<T[]>;
}

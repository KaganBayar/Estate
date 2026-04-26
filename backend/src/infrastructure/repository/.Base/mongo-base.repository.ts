import { Model } from 'mongoose';
import type { QueryFilter, UpdateQuery } from 'mongoose';
import {
  CreateDtoFor,
  UpdateDtoFor,
} from '@/presentation/dtos/.Base/base-dtos';
import { IBaseRepository } from '@/domain/repository/.Base/IBaseRepository';
export abstract class MongoBaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

    
  async findAll(filter: QueryFilter<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

    
  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

   
  async create(data: CreateDtoFor<T>): Promise<T> {
    const created = new this.model(data);
    await created.save()
    return created
    
  }

  
  async update(id: string, data: UpdateDtoFor<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data as UpdateQuery<T>, {
        returnDocument: 'after',
        runValidators: true,
      })
      .exec();
  }

  
  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}

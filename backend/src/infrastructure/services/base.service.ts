import { Model } from 'mongoose';
import type { QueryFilter, UpdateQuery } from 'mongoose';
import {CreateDtoFor} from "@/presentation/dtos/.Base/base-dtos"
import { UpdateDtoFor } from '@/presentation/dtos/.Base/base-dtos';

export abstract class BaseService<T> {
  constructor(protected readonly model: Model<T>) {}

  // Tüm kayıtları getir. pagination işlemi gerekir 
  async findAll(filter: QueryFilter<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  // Tek kayıt getirir
  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  // Yeni kayıt oluşturur
  async create(data: CreateDtoFor<T>): Promise<T> {
    const created = new this.model(data);
    return created.save() as Promise<T>;
  }

  // Kaydı günceller ve güncel hali döner
  async update(id: string, data: UpdateDtoFor<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data as UpdateQuery<T> , { returnDocument: 'after', runValidators: true })
      .exec();
  }

  // Kaydı siler ve silinen dokümanı döner
  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}

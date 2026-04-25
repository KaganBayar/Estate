import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from '@/domain/entities/Property/property.schema';
import { MongoBaseRepository } from '../.Base/mongo-base.repository';
import { IPropertyRepository } from '@/domain/repository/Property/IPropertyRepository';

@Injectable()
export class PropertyRepository
  extends MongoBaseRepository<Property>
  implements IPropertyRepository
{
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {
    super(propertyModel);
  }
}

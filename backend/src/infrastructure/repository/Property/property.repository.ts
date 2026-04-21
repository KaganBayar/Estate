import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from '@/domain/entities/Property/property.schema';
import { MongoBaseRepository } from '../.Base/mongo-base.repository';

@Injectable()
export class PropertyRepository extends MongoBaseRepository<Property> {
    constructor(@InjectModel(Property.name) private propertyModel : Model<Property>) {
        super(propertyModel)
    }
}

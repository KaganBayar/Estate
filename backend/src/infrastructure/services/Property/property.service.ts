import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from '@/domain/entities/Property/property.schema';
import { BaseService } from '../base.service';

@Injectable()
export class PropertyService extends BaseService<Property> {
    constructor(@InjectModel(Property.name) private propertyModel: Model<Property>) {
        super(propertyModel);
    }
}

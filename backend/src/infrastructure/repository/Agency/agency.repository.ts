import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agency } from '@/domain/entities/Agency/agency.schema';
import { MongoBaseRepository } from '../.Base/mongo-base.repository';
import { IAgencyRepository } from '@/domain/repository/Agency/IAgencyRepository';

@Injectable()
export class AgencyRepository
  extends MongoBaseRepository<Agency>
  implements IAgencyRepository
{
  // implements IAgencyRepository eklenecek
  constructor(@InjectModel(Agency.name) private agencyModel: Model<Agency>) {
    super(agencyModel);
  }
}

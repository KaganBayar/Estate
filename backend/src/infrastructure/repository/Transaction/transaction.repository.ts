import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { MongoBaseRepository } from '../.Base/mongo-base.repository';
import { ITransactionRepository } from '@/domain/repository/Transaction/ITransactionRepository';

@Injectable()
export class TransactionRepository
  extends MongoBaseRepository<Transaction>
  implements ITransactionRepository
{
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {
    super(transactionModel);
  }

  async findAll(filter: any = {}): Promise<Transaction[]> {
    return this.transactionModel
      .find(filter)
      .populate('listingAgent')
      .populate('sellingAgent')
      .populate('property')
      .exec();
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionModel
      .findById(id)
      .populate('listingAgent')
      .populate('sellingAgent')
      .populate('property')
      .exec();
  }

  async update(id: string, data: any): Promise<Transaction | null> {
    return this.transactionModel
      .findByIdAndUpdate(id, data, { returnDocument: 'after' })
      .populate('listingAgent')
      .populate('sellingAgent')
      .populate('property')
      .exec();
  }
}

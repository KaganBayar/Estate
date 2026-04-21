import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { MongoBaseRepository } from '../.Base/mongo-base.repository';

@Injectable()
export class TransactionRepository extends MongoBaseRepository<Transaction> {
    constructor(@InjectModel(Transaction.name) private transactionModel : Model<Transaction>) {
        super(transactionModel)
    }
}

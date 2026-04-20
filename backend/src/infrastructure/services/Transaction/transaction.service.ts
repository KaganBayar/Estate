import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { BaseService } from '../base.service';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
    constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {
        super(transactionModel);
    }
}

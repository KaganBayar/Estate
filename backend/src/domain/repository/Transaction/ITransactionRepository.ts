import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { IBaseRepository } from '../.Base/IBaseRepository';

export interface ITransactionRepository extends IBaseRepository<Transaction> {}

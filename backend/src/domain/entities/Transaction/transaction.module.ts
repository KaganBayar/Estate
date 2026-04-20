import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from "./transaction.schema";
import { TransactionService } from "@/infrastructure/services/Transaction/transaction.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])
    ],
    controllers: [],
    providers: [TransactionService],
    exports: [MongooseModule]
})
export class TransactionModule {}
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from "./transaction.schema";
import { TransactionRepository } from "@/infrastructure/repository/Transaction/transaction.repository";
import { TransactionController } from "@/presentation/controllers/transaction.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])
    ],
    controllers: [TransactionController],
    providers: [TransactionRepository],
    exports: [MongooseModule]
})
export class TransactionModule {}
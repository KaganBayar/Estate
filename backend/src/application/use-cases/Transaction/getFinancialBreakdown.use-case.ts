import { Transaction } from '@/domain/entities/Transaction/transaction.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetFinancialBreakdownUseCase {
  execute(transaction: Transaction) {
    const totalFee = transaction.totalServiceFee;
    const agencyShare = totalFee * 0.5;
    const agentsTotalShare = totalFee * 0.5;

    let listingAgentShare = 0;
    let sellingAgentShare = 0;

    // If listing agent and selling agent are the same person
    if (
      transaction.listingAgent._id.toString() ===
      transaction.sellingAgent._id.toString()
    ) {
      listingAgentShare = agentsTotalShare;
      sellingAgentShare = 0;
    }
    // If listing agent and selling agent are different people
    if (
      transaction.listingAgent._id.toString() !==
      transaction.sellingAgent._id.toString()
    ) {
      listingAgentShare = agentsTotalShare * 0.5;
      sellingAgentShare = agentsTotalShare * 0.5;
    }

    return {
      totalFee,
      agencyShare,
      listingAgentShare,
      sellingAgentShare,
      listingAgentName: transaction.listingAgent.name,
      sellingAgentName: transaction.sellingAgent.name,
    };
  }
}

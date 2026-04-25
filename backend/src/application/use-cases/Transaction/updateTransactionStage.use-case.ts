import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '@/infrastructure/repository/Transaction/transaction.repository';
import { AgencyRepository } from '@/infrastructure/repository/Agency/agency.repository';
import { AgentRepository } from '@/infrastructure/repository/Agent/agent.repository';
import { Transaction } from '@/domain/entities/Transaction/transaction.schema';

@Injectable()
export class UpdateTransactionStageUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly agentRepository: AgentRepository,
    private readonly agencyRepository: AgencyRepository,
  ) {}

  async execute(id: string, stage: string) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const previousStage = transaction.stage;
    const updatedTransaction = await this.transactionRepository.update(id, {
      stage,
    });

    // If transaction is moving to 'completed', distribute the fee
    if (
      updatedTransaction &&
      stage === 'completed' &&
      previousStage !== 'completed'
    ) {
      await this.distributeFee(updatedTransaction);
    }

    return updatedTransaction;
  }

  private async distributeFee(transaction: Transaction) {
    const totalFee = transaction.totalServiceFee;
    const agencyShare = totalFee * 0.5;
    const agentsTotalShare = totalFee * 0.5;

    // 1. Update Agency
    // Assuming there's a default agency or we find it. For this case, let's assume one agency exists.
    const agencies = await this.agencyRepository.findAll();
    if (agencies.length > 0) {
      const agency = agencies[0];
      await this.agencyRepository.update(agency._id, {
        totalMoney: (agency.totalMoney || 0) + agencyShare,
      });
    }

    // 2. Update Agents
    const listingAgent = transaction.listingAgent;
    const sellingAgent = transaction.sellingAgent;

    if (listingAgent._id.toString() === sellingAgent._id.toString()) {
      // Scenario 1: Same agent
      await this.agentRepository.update(listingAgent._id.toString(), {
        totalMoney: (listingAgent.totalMoney || 0) + agentsTotalShare,
        listingDealCount: (listingAgent.listingDealCount || 0) + 1,
        sellingDealCount: (listingAgent.sellingDealCount || 0) + 1,
      });
    } else {
      // Scenario 2: Different agents
      const sharePerAgent = agentsTotalShare * 0.5;

      await this.agentRepository.update(listingAgent._id.toString(), {
        totalMoney: (listingAgent.totalMoney || 0) + sharePerAgent,
        listingDealCount: (listingAgent.listingDealCount || 0) + 1,
      });

      await this.agentRepository.update(sellingAgent._id.toString(), {
        totalMoney: (sellingAgent.totalMoney || 0) + sharePerAgent,
        sellingDealCount: (sellingAgent.sellingDealCount || 0) + 1,
      });
    }
  }
}

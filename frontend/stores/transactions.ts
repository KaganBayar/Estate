import { defineStore } from 'pinia'

export type TransactionStatus = 'agreement' | 'earnest_money' | 'title_deed' | 'completed'

export interface Agent {
  id: string
  name: string
}

export interface Transaction {
  id: string
  propertyTitle: string
  totalServiceFee: number
  status: TransactionStatus
  listingAgent: Agent
  sellingAgent: Agent
  createdAt: string
}

export interface FinancialBreakdown {
  agencyEarned: number
  listingAgentEarned: number
  sellingAgentEarned: number
  totalAgentEarned: number
}

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [
      {
        id: '1',
        propertyTitle: 'Luxury Villa in Marbella',
        totalServiceFee: 10000,
        status: 'agreement',
        listingAgent: { id: 'a1', name: 'John Doe' },
        sellingAgent: { id: 'a2', name: 'Jane Smith' },
        createdAt: '2024-03-20'
      },
      {
        id: '2',
        propertyTitle: 'Modern Apartment in Madrid',
        totalServiceFee: 5000,
        status: 'completed',
        listingAgent: { id: 'a1', name: 'John Doe' },
        sellingAgent: { id: 'a1', name: 'John Doe' },
        createdAt: '2024-03-15'
      },
      {
        id: '3',
        propertyTitle: 'Beach House in Valencia',
        totalServiceFee: 8000,
        status: 'earnest_money',
        listingAgent: { id: 'a3', name: 'Bob Wilson' },
        sellingAgent: { id: 'a2', name: 'Jane Smith' },
        createdAt: '2024-03-18'
      }
    ] as Transaction[]
  }),

  actions: {
    updateStatus(transactionId: string, newStatus: TransactionStatus) {
      const transaction = this.transactions.find(t => t.id === transactionId)
      if (transaction) {
        transaction.status = newStatus
      }
    },

    calculateFinancials(transaction: Transaction): FinancialBreakdown {
      const agencyEarned = transaction.totalServiceFee * 0.5
      const totalAgentEarned = transaction.totalServiceFee * 0.5
      
      let listingAgentEarned = 0
      let sellingAgentEarned = 0

      if (transaction.listingAgent.id === transaction.sellingAgent.id) {
        listingAgentEarned = totalAgentEarned
        sellingAgentEarned = 0
      } else {
        listingAgentEarned = totalAgentEarned * 0.5
        sellingAgentEarned = totalAgentEarned * 0.5
      }

      return {
        agencyEarned,
        listingAgentEarned,
        sellingAgentEarned,
        totalAgentEarned
      }
    }
  },

  getters: {
    financialReports: (state) => {
      const completedTransactions = state.transactions.filter(t => t.status === 'completed')
      
      const agencyTotal = completedTransactions.reduce((acc, t) => acc + (t.totalServiceFee * 0.5), 0)
      
      const agentMap: Record<string, { 
        name: string, 
        listingCount: number, 
        sellingCount: number, 
        listingEarnings: number, 
        sellingEarnings: number,
        totalEarnings: number 
      }> = {}

      completedTransactions.forEach(t => {
        const financials = (state as any).calculateFinancials(t) // Access action in getter context

        // Initialize agents if not exists
        if (!agentMap[t.listingAgent.id]) {
          agentMap[t.listingAgent.id] = { name: t.listingAgent.name, listingCount: 0, sellingCount: 0, listingEarnings: 0, sellingEarnings: 0, totalEarnings: 0 }
        }
        if (!agentMap[t.sellingAgent.id]) {
          agentMap[t.sellingAgent.id] = { name: t.sellingAgent.name, listingCount: 0, sellingCount: 0, listingEarnings: 0, sellingEarnings: 0, totalEarnings: 0 }
        }

        // Add listing stats
        agentMap[t.listingAgent.id].listingCount++
        agentMap[t.listingAgent.id].listingEarnings += financials.listingAgentEarned
        agentMap[t.listingAgent.id].totalEarnings += financials.listingAgentEarned

        // Add selling stats (only if not already added as listing agent for the same person in Scenario 1)
        if (t.listingAgent.id !== t.sellingAgent.id) {
          agentMap[t.sellingAgent.id].sellingCount++
          agentMap[t.sellingAgent.id].sellingEarnings += financials.sellingAgentEarned
          agentMap[t.sellingAgent.id].totalEarnings += financials.sellingAgentEarned
        } else {
          // If same agent, we already added 100% of agent portion to listingEarnings in calculateFinancials logic
          // But for "count" purposes, it's both a listing and a selling
          agentMap[t.listingAgent.id].sellingCount++
        }
      })

      return {
        agencyTotal,
        agentReports: Object.values(agentMap)
      }
    }
  }
})

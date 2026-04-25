import { defineStore } from 'pinia'
import type { TransactionStatus } from '~/types/entity/Transaction/transactionStatus'
import type { IAgent } from '~/types/entity/Agent/IAgent'
import type { IProperty } from '~/types/entity/Property/IProperty'
import type { ITransaction } from '~/types/entity/Transaction/ITransaction'
import type { IFinancialBreakdown } from '~/types/api/IFinancialBreakdown'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as ITransaction[],
    isLoading: false,
    error: null as string | null,
    apiBase: 'http://127.0.0.1:3001/api'
  }),

  actions: {
    async fetchTransactions() {
      console.log('Fetching transactions from:', `${this.apiBase}/transactions`)
      this.isLoading = true
      try {
        const data = await $fetch<ITransaction[]>(`${this.apiBase}/transactions`)
        console.log('Received data:', data)
        this.transactions = data
      } catch (err: any) {
        console.error('Fetch error:', err)
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },

    async updateStatus(transactionId: string, newStatus: TransactionStatus) {
      try {
        await $fetch(`${this.apiBase}/transactions/${transactionId}`, {
          method: 'PUT',
          body: { stage: newStatus }
        })
        await this.fetchTransactions() // Refresh list
      } catch (err: any) {
        this.error = err.message
      }
    },

    async getFinancialBreakdown(transactionId: string): Promise<IFinancialBreakdown | null> {
      try {
        return await $fetch<IFinancialBreakdown>(`${this.apiBase}/transactions/${transactionId}/breakdown`)
      } catch (err: any) {
        this.error = err.message
        return null
      }
    }
  },

  getters: {
    financialReports: (state) => {
      const completedTransactions = state.transactions.filter(t => t.stage === 'completed')
      
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
        const totalAgentPortion = t.totalServiceFee * 0.5
        let listingShare = 0
        let sellingShare = 0

        if (t.listingAgent._id === t.sellingAgent._id) {
          listingShare = totalAgentPortion
        } else {
          listingShare = totalAgentPortion * 0.5
          sellingShare = totalAgentPortion * 0.5
        }

        // Initialize agents
        if (!agentMap[t.listingAgent._id]) {
          agentMap[t.listingAgent._id] = { name: t.listingAgent.name, listingCount: 0, sellingCount: 0, listingEarnings: 0, sellingEarnings: 0, totalEarnings: 0 }
        }
        if (!agentMap[t.sellingAgent._id]) {
          agentMap[t.sellingAgent._id] = { name: t.sellingAgent.name, listingCount: 0, sellingCount: 0, listingEarnings: 0, sellingEarnings: 0, totalEarnings: 0 }
        }

        agentMap[t.listingAgent._id].listingCount++
        agentMap[t.listingAgent._id].listingEarnings += listingShare
        agentMap[t.listingAgent._id].totalEarnings += listingShare

        if (t.listingAgent._id !== t.sellingAgent._id) {
          agentMap[t.sellingAgent._id].sellingCount++
          agentMap[t.sellingAgent._id].sellingEarnings += sellingShare
          agentMap[t.sellingAgent._id].totalEarnings += sellingShare
        } else {
          agentMap[t.listingAgent._id].sellingCount++
        }
      })

      return {
        agencyTotal,
        agentReports: Object.values(agentMap)
      }
    }
  }
})

<script setup lang="ts">
import { useTransactionStore } from '~/stores/transactions'
import type { ITransaction } from '~/types/entity/Transaction/ITransaction'
import StatsSummary from '~/components/dashboard/StatsSummary.vue'
import TransactionTable from '~/components/dashboard/TransactionTable.vue'
import FinancialBreakdownModal from '~/components/dashboard/FinancialBreakdownModal.vue'

const store = useTransactionStore()
const isModalOpen = ref(false)
const selectedTransaction = ref<ITransaction | null>(null)

const handleViewBreakdown = (transaction: ITransaction) => {
  selectedTransaction.value = transaction
  isModalOpen.value = true
}

onMounted(() => {
  store.fetchTransactions()
})
</script>

<template>
  <div class="py-10">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Transaction Dashboard</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Manage and track real estate transactions and financial breakdowns.</p>
    </header>

    <StatsSummary />

    <TransactionTable @view-breakdown="handleViewBreakdown" />

    <FinancialBreakdownModal 
      v-model="isModalOpen" 
      :transaction="selectedTransaction" 
    />
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '~/stores/transactions'

const store = useTransactionStore()

const stats = computed(() => [
  {
    label: 'Total Transactions',
    value: store.transactions.length,
    color: 'neutral'
  },
  {
    label: 'Pending (Agreement)',
    value: store.transactions.filter(t => t.stage === 'agreement').length,
    color: 'info'
  },
  {
    label: 'Completed',
    value: store.transactions.filter(t => t.stage === 'completed').length,
    color: 'success'
  }
])

const getColorClass = (color: string) => {
  switch (color) {
    case 'info': return 'text-info-500'
    case 'success': return 'text-success-500'
    case 'warning': return 'text-warning-500'
    case 'error': return 'text-error-500'
    case 'primary': return 'text-primary-500'
    default: return 'text-gray-900 dark:text-white'
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <UCard v-for="stat in stats" :key="stat.label">
      <div class="flex flex-col">
        <span class="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold">{{ stat.label }}</span>
        <span class="text-2xl font-bold" :class="getColorClass(stat.color)">{{ stat.value }}</span>
      </div>
    </UCard>
  </div>
</template>

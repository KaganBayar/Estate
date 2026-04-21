<script setup lang="ts">
import { useTransactionStore } from '~/stores/transactions'
import { formatCurrency } from '~/utils/formatters'

const store = useTransactionStore()
const reports = computed(() => store.financialReports)

const columns = [
  { accessorKey: 'name', header: 'Agent Name' },
  { accessorKey: 'listingCount', header: 'Listings' },
  { accessorKey: 'sellingCount', header: 'Sales' },
  { accessorKey: 'listingEarnings', header: 'Listing Earn.' },
  { accessorKey: 'sellingEarnings', header: 'Selling Earn.' },
  { accessorKey: 'totalEarnings', header: 'Total Earn.' }
]
</script>

<template>
  <div class="py-6">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white text-info-600">Financial Reports</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Comprehensive overview of agency and agent performance.</p>
    </header>

    <!-- Agency Revenue Card -->
    <div class="mb-10">
      <UCard class="border-l-8 border-green-500 bg-green-50 dark:bg-green-900/10">
        <div class="p-2">
          <p class="text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400">Total Agency Revenue</p>
          <h2 class="text-5xl font-black text-gray-900 dark:text-white mt-1">
            {{ formatCurrency(reports.agencyTotal) }}
          </h2>
          <p class="text-xs text-green-600 dark:text-green-500 mt-2 font-medium">50% portion of all completed transactions</p>
        </div>
      </UCard>
    </div>

    <!-- Agent Performance Table -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Agent Performance Breakdown</h3>
        <UBadge color="neutral" variant="soft">{{ reports.agentReports.length }} Active Agents</UBadge>
      </div>

      <UCard>
        <UTable :data="reports.agentReports" :columns="columns">
          <!-- Agent Name -->
          <template #name-cell="{ row }">
            <span class="font-bold text-gray-900 dark:text-white">{{ row.original.name }}</span>
          </template>

          <!-- Listing Count -->
          <template #listingCount-cell="{ row }">
            <UBadge color="secondary" variant="subtle" size="sm">{{ row.original.listingCount }}</UBadge>
          </template>

          <!-- Selling Count -->
          <template #sellingCount-cell="{ row }">
            <UBadge color="warning" variant="subtle" size="sm">{{ row.original.sellingCount }}</UBadge>
          </template>

          <!-- Listing Earnings -->
          <template #listingEarnings-cell="{ row }">
            <span class="text-gray-600 dark:text-gray-400 font-medium">{{ formatCurrency(row.original.listingEarnings) }}</span>
          </template>

          <!-- Selling Earnings -->
          <template #sellingEarnings-cell="{ row }">
            <span class="text-gray-600 dark:text-gray-400 font-medium">{{ formatCurrency(row.original.sellingEarnings) }}</span>
          </template>

          <!-- Total Earnings -->
          <template #totalEarnings-cell="{ row }">
            <span class="text-lg font-black text-success-600 dark:text-success-400">{{ formatCurrency(row.original.totalEarnings) }}</span>
          </template>
        </UTable>
      </UCard>
    </div>

    <!-- Empty State if no completed transactions -->
    <div v-if="reports.agentReports.length === 0" class="mt-10 p-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
      <UIcon name="i-heroicons-document-magnifying-glass" class="w-12 h-12 text-gray-400 mb-4" />
      <p class="text-gray-500">No completed transactions found to generate reports.</p>
    </div>
  </div>
</template>

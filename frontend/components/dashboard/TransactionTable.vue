<script setup lang="ts">
import { useTransactionStore, type TransactionStatus, type Transaction } from '~/stores/transactions'
import { formatCurrency } from '~/utils/formatters'

const store = useTransactionStore()

const columns = [
  { accessorKey: 'propertyTitle', header: 'Property' },
  { accessorKey: 'totalServiceFee', header: 'Total Fee' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'listingAgent.name', header: 'Listing Agent' },
  { accessorKey: 'sellingAgent.name', header: 'Selling Agent' },
  { id: 'actions', header: 'Actions' }
]

const statusItems = [
  { label: 'Agreement', value: 'agreement' },
  { label: 'Earnest Money', value: 'earnest_money' },
  { label: 'Title Deed', value: 'title_deed' },
  { label: 'Completed', value: 'completed' }
]

const getStatusColor = (status: TransactionStatus): any => {
  switch (status) {
    case 'agreement': return 'info'
    case 'earnest_money': return 'warning'
    case 'title_deed': return 'secondary'
    case 'completed': return 'success'
    default: return 'neutral'
  }
}

const emit = defineEmits<{
  (e: 'view-breakdown', transaction: Transaction): void
}>()
</script>

<template>
  <UCard>
    <UTable :data="store.transactions" :columns="columns">
      <!-- Property Title Cell -->
      <template #propertyTitle-cell="{ row }">
        <span class="font-medium text-gray-900 dark:text-white">{{ row.original.propertyTitle }}</span>
      </template>

      <!-- Total Fee Cell -->
      <template #totalServiceFee-cell="{ row }">
        {{ formatCurrency(row.original.totalServiceFee) }}
      </template>

      <!-- Status Cell -->
      <template #status-cell="{ row }">
        <UBadge :color="getStatusColor(row.original.status)" variant="soft" class="capitalize">
          {{ row.original.status.replace('_', ' ') }}
        </UBadge>
      </template>

      <!-- Actions Cell -->
      <template #actions-cell="{ row }">
        <div class="flex items-center gap-2">
          <USelect
            :model-value="row.original.status"
            :items="statusItems"
            size="xs"
            @update:model-value="(val: any) => store.updateStatus(row.original.id, val)"
          />
          <UButton
            v-if="row.original.status === 'completed'"
            icon="i-heroicons-banknotes"
            color="neutral"
            variant="solid"
            size="xs"
            @click="emit('view-breakdown', row.original)"
          >
            Breakdown
          </UButton>
        </div>
      </template>
    </UTable>
  </UCard>
</template>

<script setup lang="ts">
import { useTransactionStore } from '~/stores/transactions'
import type { ITransaction } from '~/types/entity/Transaction/ITransaction'
import type { TransactionStatus } from '~/types/entity/Transaction/transactionStatus'
import { formatCurrency } from '~/utils/formatters'

const store = useTransactionStore()

const columns = [
  { accessorKey: 'property.name', header: 'Property', id: 'property' },
  { accessorKey: 'totalServiceFee', header: 'Total Fee', id: 'fee' },
  { accessorKey: 'stage', header: 'Stage', id: 'stage' },
  { accessorKey: 'listingAgent.name', header: 'Listing Agent', id: 'listing' },
  { accessorKey: 'sellingAgent.name', header: 'Selling Agent', id: 'selling' },
  { id: 'actions', header: 'Actions' }
]

const stageItems = [
  { label: 'Agreement', value: 'agreement' },
  { label: 'Earnest Money', value: 'earnest_money' },
  { label: 'Title Deed', value: 'title_deed' },
  { label: 'Completed', value: 'completed' }
]

const getStageColor = (stage: TransactionStatus): any => {
  switch (stage) {
    case 'agreement': return 'info'
    case 'earnest_money': return 'warning'
    case 'title_deed': return 'secondary'
    case 'completed': return 'success'
    default: return 'neutral'
  }
}

const emit = defineEmits<{
  (e: 'view-breakdown', transaction: ITransaction): void
}>()
</script>

<template>
  <UCard>
    <div v-if="store.isLoading" class="p-8 text-center">
      <p class="text-gray-500">Loading transactions...</p>
    </div>
    <div v-else-if="store.error" class="p-8 text-center text-red-500">
      <p>Error: {{ store.error }}</p>
      <UButton @click="store.fetchTransactions" class="mt-2" size="sm">Retry</UButton>
    </div>
    <UTable v-else :rows="store.transactions" :data="store.transactions" :columns="columns">
      <!-- Property Name Cell -->
      <template #property-cell="{ row }">
        <span class="font-medium text-gray-900 dark:text-white">{{ row.original.property?.name || row.original.name }}</span>
      </template>

      <!-- Total Fee Cell -->
      <template #fee-cell="{ row }">
        {{ formatCurrency(row.original.totalServiceFee) }}
      </template>

      <!-- Stage Cell -->
      <template #stage-cell="{ row }">
        <UBadge :color="getStageColor(row.original.stage)" variant="soft" class="capitalize">
          {{ row.original.stage.replace('_', ' ') }}
        </UBadge>
      </template>

      <!-- Actions Cell -->
      <template #actions-cell="{ row }">
        <div class="flex items-center gap-2">
          <USelect
            :model-value="row.original.stage"
            :items="stageItems"
            size="xs"
            @update:model-value="(val: any) => store.updateStatus(row.original._id, val)"
          />
          <UButton
            v-if="row.original.stage === 'completed'"
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

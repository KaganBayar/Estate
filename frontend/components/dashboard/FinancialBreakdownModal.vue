<script setup lang="ts">
import { useTransactionStore, type Transaction } from '~/stores/transactions'
import { formatCurrency } from '~/utils/formatters'

const props = defineProps<{
  modelValue: boolean
  transaction: Transaction | null
}>()

const emit = defineEmits(['update:modelValue'])

const store = useTransactionStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const breakdown = computed(() => {
  if (!props.transaction) return null
  return store.calculateFinancials(props.transaction)
})
</script>

<template>
  <UModal v-model:open="isOpen" title="Financial Breakdown">
    <template #body>
      <div v-if="transaction && breakdown" class="space-y-6">
        <div>
          <p class="text-sm text-gray-500">Property</p>
          <p class="font-medium text-gray-900 dark:text-white text-lg">{{ transaction.propertyTitle }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div>
            <p class="text-sm text-gray-500 font-semibold">Total Service Fee</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(transaction.totalServiceFee) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-semibold">Agency Portion (50%)</p>
            <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ formatCurrency(breakdown.agencyEarned) }}</p>
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 pt-4">
          <p class="text-sm font-semibold text-gray-500 mb-3">Agent Distribution (50%)</p>
          <div class="space-y-3">
            <!-- Listing Agent -->
            <div class="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <p class="font-bold text-gray-900 dark:text-white">{{ transaction.listingAgent.name }}</p>
                <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Listing Agent</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-black text-green-600 dark:text-green-400">{{ formatCurrency(breakdown.listingAgentEarned) }}</p>
              </div>
            </div>

            <!-- Selling Agent (if different) -->
            <div v-if="transaction.listingAgent.id !== transaction.sellingAgent.id" class="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <p class="font-bold text-gray-900 dark:text-white">{{ transaction.sellingAgent.name }}</p>
                <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Selling Agent</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-black text-green-600 dark:text-green-400">{{ formatCurrency(breakdown.sellingAgentEarned) }}</p>
              </div>
            </div>
            
            <div v-else class="p-3 text-sm text-gray-500 italic bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
              Listing and Selling agent are the same person. They receive 100% of the agent portion.
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end w-full">
        <UButton color="neutral" variant="outline" @click="isOpen = false">Close</UButton>
      </div>
    </template>
  </UModal>
</template>

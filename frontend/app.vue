<script setup lang="ts">
const items = [
  [{
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Financial Reports',
    icon: 'i-heroicons-chart-bar',
    to: '/reports'
  }]
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UContainer>
      <nav class="py-4 border-b border-gray-200 dark:border-gray-800 mb-6">
        <UNavigationMenu :items="items" />
      </nav>
      <main>
        <NuxtPage />
      </main>
    </UContainer>
  </div>
</template>

<template>
  <div
    class="h-[220px] w-full rounded-2xl overflow-hidden flex cursor-pointer transition hover:brightness-90"
    :class="{
      'bg-gradient-to-r from-red-500 to-red-700': tenant.status === 'red',
      'bg-gradient-to-r from-orange-500 to-orange-700':
        tenant.status === 'orange',
      'bg-gradient-to-r from-green-500 to-green-700': tenant.status === 'green',
    }"
  >
    <div class="flex flex-col items-center m-auto text-center px-6">
      <h3 class="font-bold text-4xl">{{ tenant.name }}</h3>
      <p v-if="tenant.url" class="text-white/80 text-sm mt-2">
        {{ tenant.url }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { TenantCardItem } from '@/types/tenant'

defineProps({
  tenant: { type: Object as PropType<TenantCardItem>, required: true },
})
</script>

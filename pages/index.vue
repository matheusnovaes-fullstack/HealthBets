<template>
  <section class="rounded-2xl overflow-hidden">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
      <NuxtLink
        v-for="b in brands"
        :key="b.id"
        :to="`/brand/${b.id}`"
        class="block"
      >
        <div class="h-[180px] md:h-[220px] flex" :class="statusBg(b.status)">
          <div class="m-auto text-center px-6">
            <h3 class="font-bold text-4xl">{{ b.name }}</h3>
            <p class="text-white/80 text-sm mt-2">{{ b.url }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ETenantStatus } from '@/enums/tenant'

definePageMeta({ title: 'HealthBets' })

const brands = [
  {
    id: 1,
    name: '7k.bet.br',
    url: 'https://7k.bet.br',
    status: ETenantStatus.GREEN,
  },
  {
    id: 2,
    name: 'cassino.bet.br',
    url: 'https://cassino.bet.br',
    status: ETenantStatus.ORANGE,
  },
  {
    id: 3,
    name: 'vera.bet.br',
    url: 'https://vera.bet.br',
    status: ETenantStatus.RED,
  },
]

function statusBg(status: ETenantStatus) {
  if (status === ETenantStatus.RED)
    return 'bg-gradient-to-r from-red-500 to-red-700'
  if (status === ETenantStatus.ORANGE)
    return 'bg-gradient-to-r from-orange-500 to-orange-700'
  return 'bg-gradient-to-r from-green-500 to-green-700'
}
</script>

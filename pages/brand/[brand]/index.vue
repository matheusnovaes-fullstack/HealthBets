<template>
  <section class="w-full category-screen">
    <div class="rounded-2xl overflow-hidden">
      <div class="category-grid">
        <button
          v-for="a in actions"
          :key="a.key"
          type="button"
          class="w-full h-full rounded-none overflow-hidden transition hover:brightness-90 focus:outline-none"
          @click="onAction(a.key)"
        >
          <div class="category-tile flex" :class="statusBg(a.status)">
            <div class="m-auto text-center px-6">
              <h3 class="font-bold text-3xl sm:text-4xl">{{ a.label }}</h3>
              <p class="text-white/80 text-sm mt-2">{{ brandName }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ETenantStatus } from '@/enums/tenant'

const route = useRoute()

const brandId = computed(() => Number(route.params.brand))

const brandName = computed(() => {
  if (brandId.value === 1) return '7k.bet.br'
  if (brandId.value === 2) return 'cassino.bet.br'
  if (brandId.value === 3) return 'vera.bet.br'
  return String(brandId.value)
})

watchEffect(() => {
  useHead({ title: brandName.value })
})

type ActionKey =
  | 'deposito'
  | 'saque'
  | 'cassino'
  | 'esportiva'
  | 'liveness'
  | 'onboarding'
  | 'rollback'
  | 'freespins'
  | 'acesso'

const actions: Array<{ key: ActionKey; label: string; status: ETenantStatus }> =
  [
    { key: 'deposito', label: 'Depósito', status: ETenantStatus.GREEN },
    { key: 'saque', label: 'Saque', status: ETenantStatus.RED },
    { key: 'cassino', label: 'Cassino', status: ETenantStatus.GREEN },
    { key: 'esportiva', label: 'Esportiva', status: ETenantStatus.GREEN },
    { key: 'liveness', label: 'Liveness', status: ETenantStatus.ORANGE },
    { key: 'onboarding', label: 'Onboarding', status: ETenantStatus.GREEN },
    { key: 'rollback', label: 'Rollback', status: ETenantStatus.ORANGE },
    { key: 'freespins', label: 'Freespins', status: ETenantStatus.GREEN },
    { key: 'acesso', label: 'Acesso', status: ETenantStatus.ORANGE },
  ]

function statusBg(status: ETenantStatus) {
  if (status === ETenantStatus.RED)
    return 'bg-gradient-to-r from-red-500 to-red-700'
  if (status === ETenantStatus.ORANGE)
    return 'bg-gradient-to-r from-orange-500 to-orange-700'
  return 'bg-gradient-to-r from-green-500 to-green-700'
}

function resolveRoute(
  key: ActionKey
): { categoryId: number; itemId: number } | null {
  // categoryId: 1=Transações, 2=Apostas, 3=KYC
  if (key === 'deposito') return { categoryId: 1, itemId: 1 }
  if (key === 'saque') return { categoryId: 1, itemId: 2 }
  if (key === 'freespins') return { categoryId: 1, itemId: 3 }
  if (key === 'acesso') return { categoryId: 1, itemId: 4 }
  if (key === 'rollback') return { categoryId: 1, itemId: 9 }

  if (key === 'cassino') return { categoryId: 2, itemId: 5 }
  if (key === 'esportiva') return { categoryId: 2, itemId: 6 }

  if (key === 'liveness') return { categoryId: 3, itemId: 7 }
  if (key === 'onboarding') return { categoryId: 3, itemId: 8 }

  return null
}

function onAction(key: ActionKey) {
  const r = resolveRoute(key)
  if (!r) return
  return navigateTo(`/brand/${brandId.value}/${r.categoryId}/${r.itemId}`)
}
</script>

<style scoped>
.category-screen {
  min-height: calc(100vh - 88px);
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 640px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.category-tile {
  height: 210px;
}

@media (max-width: 639px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .category-tile {
    height: calc((100vh - 88px) / 5);
  }

  .category-tile h3 {
    font-size: 1.6rem;
    line-height: 1.2;
  }
  .category-tile p {
    margin-top: 0.25rem;
    font-size: 0.8rem;
  }
}
</style>

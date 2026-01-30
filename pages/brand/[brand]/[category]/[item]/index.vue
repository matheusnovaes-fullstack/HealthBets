<template>
  <div class="w-full h-full">
    <div class="mb-8">
      <button
        type="button"
        @click="router.back()"
        class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm"
      >
        ← Voltar aos itens
      </button>

      <h3 class="text-2xl font-bold text-white">
        {{ itemName }} - Erros Recentes
      </h3>
      <p class="text-sm text-white/60 mt-1">
        Brand: {{ brand }} | Categoria: {{ categoryId }} | Item: {{ itemId }}
      </p>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <div
        class="animate-spin h-8 w-8 border-4 border-white/20 border-t-white rounded-full"
      />
    </div>

    <div v-else-if="items.length" class="space-y-4">
      <div
        v-for="e in items"
        :key="e.id"
        class="p-6 rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/5 to-red-500/10 border border-red-400/30 backdrop-blur-sm"
      >
        <div class="flex justify-between items-start mb-4">
          <span
            class="font-semibold px-3 py-1 bg-red-500/20 text-red-100 rounded-full text-sm"
          >
            {{ e.origin }}
          </span>
          <span class="text-sm text-white/60">{{
            formatDate(e.timestamp)
          }}</span>
        </div>

        <p class="text-white/90 leading-relaxed">{{ e.message }}</p>
        <p v-if="e.source" class="text-xs text-white/50 mt-2">
          Fonte: {{ e.source }}
        </p>
      </div>
    </div>

    <div v-else class="text-center py-24 text-white/40">
      <p class="text-xl">Nenhum erro carregado ainda</p>
      <p class="text-sm mt-2">
        Sem backend: usamos mock (se existir). Quando conectar a API, essa tela
        preenche automaticamente.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorItem {
  id: number
  origin: string
  message: string
  timestamp: string
  source?: string
}

const route = useRoute()
const router = useRouter()

const brand = computed(() => route.params.brand as string)
const categoryId = computed(() => Number(route.params.category))
const itemId = computed(() => Number(route.params.item))

const itemName = computed(() => {
  const names: Record<number, string> = {
    1: 'Depósito',
    2: 'Saque',
    3: 'Freespins',
    4: 'Acessos',
    5: 'Cassino',
    6: 'Esportiva',
    7: 'Liveness',
    8: 'Onboarding',
  }
  return names[itemId.value] || 'Item'
})

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const { data, pending } = await useAsyncData<ErrorItem[]>(
  `errors:${brand.value}:${categoryId.value}:${itemId.value}`,
  async () => {
    try {
      return await $fetch<ErrorItem[]>(
        `/api/brands/${brand.value}/categories/${categoryId.value}/items/${itemId.value}/errors`
      )
    } catch {
      try {
        return await $fetch<ErrorItem[]>(
          `/mock/brands/${brand.value}/categories/${categoryId.value}/items/${itemId.value}.json`
        )
      } catch {
        return []
      }
    }
  },
  { default: () => [] }
)

const items = computed(() => data.value ?? [])
</script>

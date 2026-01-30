<template>
  <div class="w-full">
    <h3 class="text-2xl font-bold text-white mb-6">Itens da categoria</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="subCategory in subCategories"
        :key="subCategory.id"
        class="cursor-pointer rounded-2xl p-8 text-white shadow-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        @click="goToItem(subCategory.id)"
      >
        <div class="text-xl font-bold">{{ subCategory.name }}</div>
        <div class="text-sm text-white/60 mt-2">
          {{ subCategory.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
function goToItem(id: number) {
  return navigateTo(
    `/brand/${route.params.brand}/${route.params.category}/${id}`
  )
}
type SubCategory = {
  id: number
  name: string
  description: string
}

const categoryId = computed(() => Number(route.params.category))

const subCategories = computed<SubCategory[]>(() => {
  if (categoryId.value === 1) {
    return [
      { id: 1, name: 'Depósito', description: 'Erros e origem do depósito' },
      { id: 2, name: 'Saque', description: 'Erros e origem do saque' },
      { id: 3, name: 'Freespins', description: 'Erros e origem de freespins' },
      { id: 4, name: 'Acessos', description: 'Erros e origem de acessos' },
    ]
  }

  if (categoryId.value === 2) {
    return [
      { id: 5, name: 'Cassino', description: 'Erros e origem do cassino' },
      { id: 6, name: 'Esportiva', description: 'Erros e origem da esportiva' },
      { id: 3, name: 'Freespins', description: 'Erros e origem de freespins' },
      { id: 4, name: 'Acessos', description: 'Erros e origem de acessos' },
    ]
  }

  return [
    { id: 7, name: 'Liveness', description: 'Erros e origem do liveness' },
    { id: 8, name: 'Onboarding', description: 'Erros e origem do onboarding' },
    { id: 3, name: 'Freespins', description: 'Erros e origem de freespins' },
    { id: 4, name: 'Acessos', description: 'Erros e origem de acessos' },
  ]
})
</script>

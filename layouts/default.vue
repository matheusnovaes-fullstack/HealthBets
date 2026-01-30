<template>
  <div class="px-6 py-4">
    <div class="w-full flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            v-if="route.path !== '/'"
            type="button"
            @click="goBack"
            class="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 transition"
            aria-label="Voltar"
          >
            <span class="text-white text-xl">←</span>
          </button>

          <h2 class="text-2xl font-bold text-white">{{ pageTitle }}</h2>
        </div>

        <span class="text-xs text-white/70">Visualização em tempo real</span>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const pageTitle = computed(() => (route.meta?.title as string) || 'HealthBets')

function goBack() {
  if (process.client && window.history.length > 1) router.back()
  else router.replace('/')
}
</script>

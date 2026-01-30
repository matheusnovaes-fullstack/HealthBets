<template>
  <div>
    <h1 class="font-bold text-gray-400 text-2xl">Cactus Report Panel</h1>

    <u-form
      :schema="schema"
      :state="state"
      class="space-y-4 w-[300px]"
      @submit="onSubmit"
    >
      <u-form-group label="Email" name="email">
        <u-input v-model="state.email" size="lg" />
      </u-form-group>

      <u-form-group label="Password" name="password">
        <u-input v-model="state.password" type="password" size="lg" />
      </u-form-group>

      <u-button class="w-full" type="submit" size="lg">Submit</u-button>
    </u-form>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'

definePageMeta({
  layout: 'auth',
  title: 'Login',
})

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

async function onSubmit(event: any) {
  console.log(event.data)
}
</script>

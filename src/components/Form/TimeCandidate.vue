<template>
  <div class="candidate">
    <Field
      :id="`timeCandidates_${index}_time`"
      :name="`timeCandidates[${index}].time`"
      v-slot="{ field, handleBlur }"
    >
      <input v-bind="field" @blur="handleBlur" class="input" />
    </Field>
    <Field
      :id="`timeCandidates_${index}_available`"
      :name="`timeCandidates[${index}].available`"
      v-slot="{ field, handleBlur }"
    >
      <input v-bind="field" @blur="handleBlur" type="checkbox" />
    </Field>
    <div @click="onRemove">delete</div>
  </div>
  <div
    class="errors"
    v-for="error in props.errorBag[`timeCandidates[${index}].time`]"
    :key="`timeCandidates_${index}_time_${error}`"
  >
    {{ error }}
  </div>
  <div
    class="errors"
    v-for="error in props.errorBag[`timeCandidates[${index}].available`]"
    :key="`timeCandidates_${index}_available_${error}`"
  >
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'

const props = defineProps<{ errorBag: Partial<Record<string, string[]>>; index: number }>()
const emits = defineEmits<{ remove: [index: number] }>()

const onRemove = () => {
  emits('remove', props.index)
}

// watch(timeCandidates, (value) => {
//   console.log('[debug] timeCandidates: ', value)
// })
// watch(errorBag, (value) => {
//   console.log('[debug] errorBag: ', value)
// })
// watch(errors, (value) => {
//   console.log('[debug] erros: ', value)
// })
</script>

<style>
.input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px;
}

.candidate {
  display: flex;
  gap: 8px;
  align-items: center;
}

.errors {
  color: red;
}
</style>

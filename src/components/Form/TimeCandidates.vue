<template>
  <label>候補日</label>
  <ul v-for="(_, index) in fields" :key="`timeCandidates_${index}`">
    <li>
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
        <div @click="remove(index)">delete</div>
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
    </li>
  </ul>
  <div @click="push(DEFAULT_TIME_CANDIDATE)">add</div>
</template>

<script setup lang="ts">
import { DEFAULT_TIME_CANDIDATE } from '@/constants/form'
import type { TimeCandidateForm } from '@/schema/form'
import { Field, useFieldArray } from 'vee-validate'

const props = defineProps<{ errorBag: Partial<Record<string, string[]>> }>()

const { push, remove, fields } = useFieldArray<TimeCandidateForm>('timeCandidates')

// defineField('timeCandidates', validateConfig)

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

<template>
  <div class="candidate">
    <input v-model="time" @blur="onTimeBlur" class="input" />
    <input v-model="available" @blur="onAvailableBlur" type="checkbox" />
    <div @click="onRemove">delete</div>
  </div>
  <div class="errors" v-for="error in timeErrors" :key="`timeCandidates_${index}_time_${error}`">
    {{ error }}
  </div>
  <div
    class="errors"
    v-for="error in availableErrors"
    :key="`timeCandidates_${index}_available_${error}`"
  >
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_TIME_CANDIDATE } from '@/constants/form'
import { TimeCandidateFormSchema, type TimeCandidateForm } from '@/schema/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useField } from 'vee-validate'
import { watch } from 'vue'

const props = defineProps<{ index: number }>()
const emits = defineEmits<{ remove: [index: number] }>()

const onRemove = () => {
  emits('remove', props.index)
}

const {
  value: time,
  handleBlur: timeHandleBlur,
  errors: timeErrors
} = useField<TimeCandidateForm['time']>(
  () => `timeCandidates[${props.index}].time`,
  toTypedSchema(TimeCandidateFormSchema.shape.time),
  {
    initialValue: DEFAULT_TIME_CANDIDATE.time
  }
)

const onTimeBlur = (e: Event) => {
  timeHandleBlur(e, true)
}

const {
  value: available,
  handleBlur: availableHandleBlur,
  errors: availableErrors
} = useField<TimeCandidateForm['available']>(
  () => `timeCandidates[${props.index}].available`,
  toTypedSchema(TimeCandidateFormSchema.shape.available),
  {
    initialValue: DEFAULT_TIME_CANDIDATE.available
  }
)

const onAvailableBlur = (e: Event) => {
  availableHandleBlur(e, true)
}

watch(time, (value) => {
  console.log(`[debug] time [${props.index}]: `, value)
})

watch(available, (value) => {
  console.log(`[debug] available [${props.index}]: `, value)
})
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

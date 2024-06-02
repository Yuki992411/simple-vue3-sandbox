<template>
  <div>
    <h1>This is an form page</h1>
    <form @submit="onSubmit">
      <div>
        <label>Name</label>
        <input v-model="formName" v-bind="formNameAttr" class="input" />
        <div class="errors" v-for="error in errorBag.name" :key="`formAge_${error}`">
          {{ error }}
        </div>
      </div>
      <div>
        <label>Age</label>
        <input v-model="formAge" v-bind="formAgeAttr" class="input" />
        <div class="errors" v-for="error in errorBag.age" :key="`formAge_${error}`">
          {{ error }}
        </div>
      </div>
      <div>
        <FormTimeCandidates />
      </div>
      <button :disabled="!meta.valid">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import FormTimeCandidates from '@/components/Form/TimeCandidates.vue'
import { FormSchema, type Form } from '@/schema/form'
import { DEFAULT_AGE, DEFAULT_NAME, DEFAULT_TIME_CANDIDATE } from '@/constants/form'

const { meta, errorBag, handleSubmit, defineField } = useForm<Form>({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: {
    name: DEFAULT_NAME,
    age: DEFAULT_AGE,
    timeCandidates: [DEFAULT_TIME_CANDIDATE]
  }
})

const validateConfig = {
  validateOnBlur: true
} as const satisfies Parameters<typeof defineField>[1]

const [formName, formNameAttr] = defineField('name', validateConfig)
const [formAge, formAgeAttr] = defineField('age', validateConfig)

// watch(timeCandidates, (value) => {
//   console.log('[debug] timeCandidates: ', value)
// })
// watch(errorBag, (value) => {
//   console.log('[debug] errorBag: ', value)
// })
// watch(errors, (value) => {
//   console.log('[debug] erros: ', value)
// })

const onSubmit = handleSubmit((values) => {
  console.log(values)
  alert(JSON.stringify(values, null, 2))
})
</script>

<style>
.input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px;
}

.errors {
  color: red;
}
</style>

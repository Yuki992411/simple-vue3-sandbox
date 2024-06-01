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
              v-for="error in errorBag[`timeCandidates.${index}.time`]"
              :key="`timeCandidates_${index}_time_${error}`"
            >
              {{ error }}
            </div>
            <div
              class="errors"
              v-for="error in errorBag[`timeCandidates.${index}.available`]"
              :key="`timeCandidates_${index}_available_${error}`"
            >
              {{ error }}
            </div>
          </li>
        </ul>
        <div @click="push(initialTimeCandidate)">add</div>
      </div>
      <button :disabled="!meta.valid">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldArray, useForm } from 'vee-validate'
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(2).min(3).max(10),
  age: z.coerce.number().min(18),
  timeCandidates: z.array(
    z.object({
      time: z.string().regex(/^[0-9]{2}:[0-9]{2}$/, {
        message: 'hh:mmの形式で入力してください'
      }),
      available: z.literal(false, {
        message: 'チェックしてください'
      })
    })
  )
})

const initialTimeCandidate = { time: '', available: false } as const satisfies z.infer<
  typeof FormSchema
>['timeCandidates'][number]

const { meta, errors, errorBag, handleSubmit, defineField } = useForm<z.infer<typeof FormSchema>>({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: {
    name: '',
    age: 20,
    timeCandidates: [initialTimeCandidate]
  }
})

const { push, remove, fields } =
  useFieldArray<z.infer<typeof FormSchema>['timeCandidates'][number]>('timeCandidates')

const validateConfig = {
  validateOnBlur: true
} as const satisfies Parameters<typeof defineField>[1]

const [formName, formNameAttr] = defineField('name', validateConfig)
const [formAge, formAgeAttr] = defineField('age', validateConfig)
defineField('timeCandidates', validateConfig)

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

.candidate {
  display: flex;
  gap: 8px;
  align-items: center;
}

.errors {
  color: red;
}
</style>

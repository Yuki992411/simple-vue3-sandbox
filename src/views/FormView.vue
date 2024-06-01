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
      <button :disabled="!meta.valid">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(2).min(3).max(10),
  age: z.coerce.number().min(18)
  //   timeCandidates: z.array(
  //     z.object({
  //       time: z.string().regex(/^[0-9]{2}:[0-9]{2}$/),
  //       available: z.boolean()
  //     })
  //   )
})

const { meta, errorBag, handleSubmit, defineField } = useForm<z.infer<typeof FormSchema>>({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: {
    name: '',
    age: 20
  }
})

const validateConfig = {
  validateOnBlur: true
} as const satisfies Parameters<typeof defineField>[1]

const [formName, formNameAttr] = defineField('name', validateConfig)
const [formAge, formAgeAttr] = defineField('age', validateConfig)

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

<template>
  <label>候補日</label>
  <ul v-for="(field, index) in fields" :key="`timeCandidates_${field.key}`">
    <li>
      <TimeCandidate :index="index" @remove="remove" />
    </li>
  </ul>
  <div @click="push(DEFAULT_TIME_CANDIDATE)">add</div>
</template>

<script setup lang="ts">
import { DEFAULT_TIME_CANDIDATE } from '@/constants/form'
import type { TimeCandidateForm } from '@/schema/form'
import { useFieldArray } from 'vee-validate'
import TimeCandidate from '@/components/Form/TimeCandidate.vue'

const { push, remove, fields } = useFieldArray<TimeCandidateForm>('timeCandidates')
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

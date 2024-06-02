import type { TimeCandidateForm } from '@/schema/form'

export const DEFAULT_NAME = '' as const
export const DEFAULT_AGE = 20 as const
export const DEFAULT_TIME_CANDIDATE = {
  time: '',
  available: false
} as const satisfies TimeCandidateForm

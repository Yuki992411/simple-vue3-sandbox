import { z } from 'zod'

export const TimeCandidateFormSchema = z.object({
  time: z.string().regex(/^[0-9]{2}:[0-9]{2}$/, {
    message: 'hh:mmの形式で入力してください'
  }),
  available: z.literal(false, {
    message: 'チェックしてください'
  })
})
export type TimeCandidateForm = z.infer<typeof TimeCandidateFormSchema>

export const FormSchema = z.object({
  name: z.string().min(2).min(3).max(10),
  age: z.coerce.number().min(18),
  timeCandidates: z.array(TimeCandidateFormSchema)
})
export type Form = z.infer<typeof FormSchema>

import { Moment } from 'moment'

export interface IMonthlyPopulations {
  id: number
  province_code: string
  periode: string
  value: number
  created_at: Moment
  updated_at?: Moment
}

import { Moment } from 'moment'

export interface IMonthlyPopulations {
  id: number
  province_name: string
  province_code: string
  periode: string | Moment
  value: number
  created_at: Moment
  updated_at?: Moment
}

export interface IIncreasingPopulations {
  province_name: string
  province_code: string
  value: number
  increasing: number
}

export interface IDecreasingPopulations {
  province_name: string
  province_code: string
  value: number
  decreasing: number
}

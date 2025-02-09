import { Moment } from 'moment'

export interface IProvinces {
  id: number
  province_code: string
  province_name: string
  created_at: Moment
  updated_at?: Moment
}

import { _TModeAttributes } from '@utilities/helper-type.util'
import { Transform } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export class StandartQueryFindParamsDTO {
  @IsEnum(_TModeAttributes)
  @IsOptional()
  readonly _mode: (typeof _TModeAttributes)[number]

  @Transform(v => (typeof v.value !== 'number' || v.value < 1 ? 1 : v.value))
  @IsNumber()
  @IsOptional()
  readonly _page: number

  @Transform(v => (typeof v.value !== 'number' || v.value < 1 ? 20 : v.value))
  @IsNumber()
  @IsOptional()
  readonly _pageSize: number

  @IsEnum(['Y', 'N'])
  @IsOptional()
  readonly _activeOnly?: 'Y' | 'N'
}

export type QueryFindParams<T = any> = {
  [P in keyof T]: string | number | number[] | string[] | null
} & StandartQueryFindParamsDTO

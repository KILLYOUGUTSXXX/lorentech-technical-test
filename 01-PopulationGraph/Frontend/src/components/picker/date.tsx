import { DatePicker, DatePickerProps } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import type { Moment } from 'moment'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'

interface CustomDate {
  format?: string
  pickerFormat?: string
  onChange?: any
  size?: SizeType
  className?: string
  defaultValue?: any
  name?: string
  disabledDate?: (curr: Moment) => boolean
  disabled?: boolean
  allowClear?: any
  customIcon?: any
}

/**
 * OPTIONAL
 * - format -> "DD-MM-YYYY"
 * picker format -> year | month | week
 * - onchange -> function
 * - size -> large | middle | small
 * - className
 */

export const LynxDatePicker =
  DatePicker.generatePicker<Moment>(momentGenerateConfig)

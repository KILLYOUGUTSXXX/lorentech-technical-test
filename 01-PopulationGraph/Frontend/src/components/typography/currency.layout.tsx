import { Flex } from 'antd'
import { CSSProperties } from 'react'

export interface ILynxCurrency {
  value: number
  locale?: CurrencyLocale
  fraction?: Fraction
  className?: string
  style?: CSSProperties
  prefix?: string
  suffix?: string
  prefixClassName?: string
  textOnly?: boolean
}

type CurrencyLocale = 'ID-id' | 'en-US'
interface Fraction {
  min?: number
  max?: number
}

export function parseCurrency(
  value: number,
  locale?: CurrencyLocale,
  fraction?: Fraction
) {
  try {
    return value.toLocaleString(locale || 'ID-id', {
      minimumFractionDigits: fraction?.min || 0,
      maximumFractionDigits: fraction?.max || 0
    })
  } catch (er) {
    return null
  }
}

export default function LynxCurrency(props: ILynxCurrency) {
  const value = parseFloat((props.value || '0').toString())
  if (props.textOnly) return parseCurrency(value, props.locale, props.fraction)
  return (
    <Flex
      className={props.className}
      style={props.style}
      gap={4}
      align="center"
    >
      {props.prefix && (
        <span className={props.prefixClassName}>{props.prefix}</span>
      )}
      {parseCurrency(value, props.locale, props.fraction)}
      {props.suffix && (
        <span className={props.prefixClassName}>{props.suffix}</span>
      )}
    </Flex>
  )
}

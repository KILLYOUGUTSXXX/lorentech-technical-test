import { LynxDatePicker } from '@afx/components/picker/date'
import LynxCurrency, {
  parseCurrency
} from '@afx/components/typography/currency.layout'
import {
  IActionPopulation,
  IStatePopulation
} from '@lynx/models/main/population.model'
import { useLynxStore } from '@lynx/store/core'
import { Flex, List, Select } from 'antd'
import moment, { Moment } from 'moment'

const periodeFormat = 'MMM YYYY'
export default function DecreasingLayout() {
  const {
    state: statePopulation,
    isLoading: loadingPopulation,
    useActions: actionPopulation
  } = useLynxStore<IStatePopulation, IActionPopulation>('population')

  const LOADING_POPULATION =
    loadingPopulation('onGetPopulationDecreasing') || false

  const onChangePeriode = (periode: Moment) => {
    if (!periode) return null
    return actionPopulation<'onGetPopulationDecreasing'>(
      'onGetPopulationDecreasing',
      [{ periode: moment(periode).format('YYYY-MM-01') }],
      true
    )
  }
  return (
    <Flex vertical gap={12} justify="space-between" className="w-full h-full">
      <Flex justify="space-between" align="center">
        <p className="underline text-[1.5em] font-semibold text-stone-600">
          TOP 5 Decreasing Population
        </p>
        <LynxDatePicker.MonthPicker
          className="w-[200px]"
          size="large"
          disabled={LOADING_POPULATION}
          value={moment(statePopulation.decreasingFilter.periode)}
          format="MMM YYYY"
          onChange={onChangePeriode}
        />
      </Flex>
      <List
        className="w-full py-4 px-6"
        dataSource={statePopulation.listDecreasing}
        bordered
        renderItem={(item, index) => (
          <Flex
            gap={6}
            className="w-full text-[16px] font-semibold text-stone-500"
            align="center"
          >
            <Flex className="w-5">
              <p>{index + 1}.</p>
            </Flex>
            <Flex justify="space-between" align="center" className="w-full">
              <p>{item.province_name}.</p>
              <Flex gap={2} vertical align="end" className="leading-[1.25]">
                <LynxCurrency
                  value={item.value as number}
                  fraction={{ max: 2 }}
                  locale="en-US"
                  className="font-semibold text-[18px]"
                />
                <LynxCurrency
                  value={item.decreasing as number}
                  prefix="-"
                  fraction={{ max: 2 }}
                  locale="en-US"
                  className="font-semibold text-red-600 text-[14px]"
                />
              </Flex>
            </Flex>
          </Flex>
        )}
      />
    </Flex>
  )
}

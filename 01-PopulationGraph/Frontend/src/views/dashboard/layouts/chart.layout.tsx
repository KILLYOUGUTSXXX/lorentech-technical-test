import LynxCurrency, {
  parseCurrency
} from '@afx/components/typography/currency.layout'
import {
  IActionPopulation,
  IStatePopulation
} from '@lynx/models/main/population.model'
import {
  IActionProvince,
  IStateProvince
} from '@lynx/models/main/province.model'
import { useLynxStore } from '@lynx/store/core'
import { Flex, Select } from 'antd'
import moment from 'moment'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const periodeFormat = 'MMM YYYY'
export default function ChartLayout() {
  const {
    state: statePopulation,
    isLoading: loadingPopulation,
    useActions: actionPopulation
  } = useLynxStore<IStatePopulation, IActionPopulation>('population')

  const { state: stateProvince, isLoading: loadingProvince } = useLynxStore<
    IStateProvince,
    IActionProvince
  >('province')

  const LOADING_PROVINCE = loadingProvince('onGetListProvinces') || false
  const LOADING_POPULATION = loadingPopulation('onGetPopulationGraph') || false

  const onChangeProvince = (province?: string) => {
    if (!province) return null
    return actionPopulation<'onGetPopulationGraph'>(
      'onGetPopulationGraph',
      [{ provinceCode: province }],
      true
    )
  }
  return (
    <Flex vertical gap={12} justify="space-between" className="w-full h-full">
      <Flex className="justify-between" gap={12}>
        <Flex className="mb-6">
          <p className="underline text-[26px] font-semibold text-stone-600">
            Data Population '2024
          </p>
        </Flex>
        <Flex gap={6} align="center" justify="end" className="px-[24px]">
          <p className="text-[16px] font-semibold text-green-600">Province :</p>
          <Select
            onSelect={onChangeProvince}
            value={statePopulation.graphFilter.province}
            loading={LOADING_PROVINCE || LOADING_POPULATION}
            size="large"
            className="w-[300px]"
            filterOption={(a, b) =>
              b?.label?.toLowerCase?.().indexOf?.(a.toLowerCase()) !== -1
            }
            showSearch
            options={stateProvince.listProvinces.map(a => ({
              value: a.province_code,
              label: a.province_name
            }))}
          />
        </Flex>
      </Flex>
      <Flex className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={statePopulation.listPopulations}
            cx="periode"
            cy="value"
            height={300}
            width={300}
            margin={{ bottom: 24, top: 12, left: 24, right: 24 }}
          >
            <CartesianGrid strokeDasharray="3 3" /> {/* Optional grid lines */}
            <XAxis
              dataKey="periode"
              tickFormatter={value => moment(value).format(periodeFormat)}
            />
            {/* X-axis data key */}
            <YAxis
              allowDecimals
              tickFormatter={value =>
                parseCurrency(value, 'en-US', { max: 2 }) as string
              }
            />
            <Tooltip
              content={({ active, payload, label }: any) => {
                const [item] = payload
                return (
                  active &&
                  payload?.length && (
                    <Flex
                      className="px-4 py-6 bg-white rounded-md min-h-[75px] min-w-[150px] shadow-lg"
                      vertical
                    >
                      <p className="font-semibold text-[14px]">
                        Population of Province {item?.payload?.province_name}
                      </p>
                      <LynxCurrency
                        value={item.payload?.value as number}
                        fraction={{ max: 2 }}
                        locale="en-US"
                        className="font-semibold text-green-600 text-[24px]"
                      />
                      <p className="text-[14px] font-semibold italic">
                        {moment(item.payload?.periode).format(periodeFormat)}
                      </p>
                    </Flex>
                  )
                )
              }}
            />
            <Legend
              formatter={(_, payload) => (
                <span className="font-semibold w-full">Population Count</span>
              )}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#73ad71" />
            <Line
              dataKey="value"
              fill="white"
              stroke="gold"
              type="monotone"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  )
}

import { IModelDefinitions } from '@afx/interfaces/global.iface'
import { IProvinces } from '@afx/interfaces/main/province.iface'
import { message } from 'antd'
import * as service from '@afx/services/main/province.service'
import { IActionPopulation } from './population.model'

export type IActionProvince = {
  onGetListProvinces: (payload: any) => void
  updateState: (payloads?: Partial<IStateProvince>) => void
}

export type IStateProvince = {
  listProvinces: Array<IProvinces>
}

const InnerGlobalModels: IModelDefinitions<IStateProvince, IActionProvince> = {
  name: 'province',
  subscriptions:
    (_, getAction) =>
    ({ pathname }) => {
      getAction('province')<'onGetListProvinces'>(
        'onGetListProvinces',
        [{ _mode: 'mnf' }],
        true
      )
    },
  model: (put, getStates, getActions) => ({
    state: {
      listProvinces: []
    },
    actions: {
      async onGetListProvinces(payload) {
        try {
          const lists = await service.getListProvinces(payload)
          put({
            listProvinces: lists.data
          })

          getActions<IActionPopulation>('population')<'onGetPopulationGraph'>(
            'onGetPopulationGraph',
            [{ provinceCode: lists.data[0]?.province_code }],
            true
          )

          getActions<IActionPopulation>(
            'population'
          )<'onGetPopulationIncreasing'>(
            'onGetPopulationIncreasing',
            [{ periode: '2024-05-01' }],
            true
          )

          getActions<IActionPopulation>(
            'population'
          )<'onGetPopulationDecreasing'>(
            'onGetPopulationDecreasing',
            [{ periode: '2024-05-01' }],
            true
          )
        } catch (er: any) {
          return message.error(er.message)
        }
      },
      updateState({ ...payload }) {
        put({ ...payload })
      }
    }
  })
}

export default InnerGlobalModels

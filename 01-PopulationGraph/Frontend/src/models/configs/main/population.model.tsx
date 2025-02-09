import { IModelDefinitions } from '@afx/interfaces/global.iface'
import {
  IDecreasingPopulations,
  IIncreasingPopulations,
  IMonthlyPopulations
} from '@afx/interfaces/main/population.iface'
import { message } from 'antd'
import * as service from '@afx/services/main/population.service'

export type IActionPopulation = {
  onGetPopulationGraph: (data: { provinceCode: string }) => void
  onGetPopulationIncreasing: (data: {
    /** ISO Date Format : YYYY-MM-DD */
    periode: string
  }) => void
  onGetPopulationDecreasing: (data: {
    /** ISO Date Format : YYYY-MM-DD */
    periode: string
  }) => void
  updateState: (payloads?: Partial<IStatePopulation>) => void
}

export type IStatePopulation = {
  graphFilter: {
    province?: string
  }
  increasingFilter: {
    periode?: string
  }
  decreasingFilter: {
    periode?: string
  }
  listPopulations: Array<IMonthlyPopulations>
  listIncreasing: Array<IIncreasingPopulations>
  listDecreasing: Array<IDecreasingPopulations>
}

const InnerGlobalModels: IModelDefinitions<
  IStatePopulation,
  IActionPopulation
> = {
  name: 'population',
  subscriptions:
    (_, getAction) =>
    ({ pathname }) => {},
  model: (put, getStates, getActions) => ({
    state: {
      graphFilter: {
        province: undefined
      },
      increasingFilter: {
        periode: undefined
      },
      decreasingFilter: {
        periode: undefined
      },
      listPopulations: [],
      listIncreasing: [],
      listDecreasing: []
    },
    actions: {
      async onGetPopulationGraph(payload) {
        try {
          const lists = await service.getPopulationGraph(payload)
          put({
            listPopulations: lists.data,
            graphFilter: { province: payload.provinceCode }
          })
        } catch (er: any) {
          return message.error(er.message)
        }
      },
      async onGetPopulationIncreasing(payload) {
        try {
          const lists = await service.getPopulationIncreasing(payload)
          put({
            listIncreasing: lists.data,
            increasingFilter: { periode: payload.periode }
          })
        } catch (er: any) {
          return message.error(er.message)
        }
      },
      async onGetPopulationDecreasing(payload) {
        try {
          const lists = await service.getPopulationDecreasing(payload)
          put({
            listDecreasing: lists.data,
            decreasingFilter: { periode: payload.periode }
          })
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

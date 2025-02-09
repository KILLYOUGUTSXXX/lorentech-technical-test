import request from '@afx/utils/request.util'
import api from '@afx/utils/config.rest'
import {
  IDecreasingPopulations,
  IIncreasingPopulations,
  IMonthlyPopulations
} from '@afx/interfaces/main/population.iface'

export function getPopulationGraph(data: { provinceCode: string }) {
  return request<Array<IMonthlyPopulations>>({
    url: api.population.graph,
    method: 'GET',
    data
  })
}

export function getPopulationIncreasing(data: {
  /** ISO Date Format : YYYY-MM-DD */
  periode: string
}) {
  return request<Array<IIncreasingPopulations>>({
    url: api.population.increasing,
    method: 'GET',
    data
  })
}

export function getPopulationDecreasing(data: {
  /** ISO Date Format : YYYY-MM-DD */
  periode: string
}) {
  return request<Array<IDecreasingPopulations>>({
    url: api.population.decreasing,
    method: 'GET',
    data
  })
}

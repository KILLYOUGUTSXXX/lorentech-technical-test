import request from '@afx/utils/request.util'
import api from '@afx/utils/config.rest'
import { IProvinces } from '@afx/interfaces/main/province.iface'

export function getListProvinces(data: any) {
  return request<Array<IProvinces>>({
    url: api.provinces.main,
    method: 'GET',
    data
  })
}

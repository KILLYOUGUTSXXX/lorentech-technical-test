import axios from 'axios'
import { StandartPagination } from '@afx/interfaces/global.iface'

interface IRequestPayloads<T = any> {
  url: string
  method: 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'POST'
  headers?: any
  data?: T
  bodyType?: 'raw' | 'formData'
  dataBody?: any
}

interface IResponsePayloads<T = any> {
  data: T
  reqId: string
  statusCode: number
  success: boolean
  message: string
  page: number
  pageSize: number
  total: number
}

export interface PagingResponse<T> {
  page_data: Array<T>
  page_info: StandartPagination
}

const getQueryByName = (name: string, url: string) => {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(url)

  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

const randomAuthKey = (Math.random() * 1738).toFixed(3)
export default async function request<
  T extends PagingResponse<any> | any = any
>({
  url,
  method = 'GET',
  headers = {},
  bodyType = 'raw',
  data
}: IRequestPayloads<any>): Promise<IResponsePayloads<T>> {
  let extendedItems: any = {}

  if (method === 'GET') {
    extendedItems = {
      params: data
    }
  } else {
    extendedItems = {
      data: bodyType === 'formData' ? data : JSON.stringify({ ...data })
    }
  }

  return new Promise((resolve, reject) =>
    axios
      .request({
        url,
        headers: {
          'Content-Type':
            bodyType === 'formData'
              ? 'multipart/form-data'
              : 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        },
        method,
        ...extendedItems
      })
      .then(response => resolve(response.data))
      .catch(error => {
        const msg = error?.response?.data?.meta
        const newMsg = []
        if (
          msg?.message &&
          typeof msg?.message === 'object' &&
          !Array.isArray(msg?.message)
        ) {
          for (const a in msg?.message) {
            newMsg.push(msg?.message?.[a])
          }
          newMsg.flat()
        } else if (typeof msg?.message === 'string') {
          newMsg.push(msg?.message)
        }
        reject({
          ...error?.response?.data?.meta,
          message: newMsg
        })
      })
  )
}

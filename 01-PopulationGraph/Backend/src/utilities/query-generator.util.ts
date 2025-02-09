import { QueryFindParams } from '@common-dtos/globals.dto';
import { isArray } from 'class-validator'
import * as moment from 'moment'
import { Op } from 'sequelize'


export function queryGeneratorSql(
  attributes: any[] = [],
  query: QueryFindParams<any>,
  paging: {}
): { where: any; limit?: number; offset?: number; page?: number } {
  // using duration filter as : _DURATION@{format type} = [int, int]
  const { _page: page, _pageSize: pageSize, ...others } = query
  const filtered = Object.getOwnPropertyNames(others || {}) || []
  let where = {}
  let limitQuery = {}
  filtered.map(item => {
    const itemRegex = item.split('@')[0]
    if (attributes.indexOf(itemRegex) !== -1) {
      /**True or false */
      if (item.indexOf('@TF') !== -1) {
        where[itemRegex] = { [Op.eq]: { T: true, F: false }[query[item] as any] || null  }
      } else if (
        item === 'createdat' ||
        item === 'updatedat' ||
        item.indexOf('@D') !== -1
      ) {
        // Date Format : @D
        where[itemRegex] = { [Op.between]: query[item] }
      } else if (item.indexOf('@FI') !== -1) {
        // Find In, using seperator "," : @FI
        where[itemRegex] = {
          [Op.in]: ((query[item] || '') as string).split(',')
        }
      } else if (item.indexOf('@IN') !== -1 && isArray(query[item])) {
        let tmpItems = []
        for (let z in query[item] as Object) {
          const dataItems = query[item][z]
          tmpItems.push({ [Op.eq]: dataItems })
        }
        where[itemRegex] = { [Op.or]: tmpItems }
      } else {
        // Normal Query
        const itemQuery = (query[item] || '') as string
        if (
          itemQuery.match(/\%[0-9A-Za-z,_-]+\%/g) ||
          itemQuery.match(/[0-9A-Za-z,_-]+\%/g) ||
          itemQuery.match(/\%[0-9A-Za-z,_-]+/g)
        ) {
          where[itemRegex] = { [Op.like]: `${query[item]}` }
        } else {
          where[itemRegex] = { [Op.iRegexp]: `${query[item]}` }
        }
      }
    }
    return {}
  })

  if (paging) {
    limitQuery = {
      limit: +(pageSize || 20),
      offset: +(page - 1 || 0) * +(pageSize || 20),
      page: +(page || 1)
    }
  }

  return { where, ...limitQuery }
}

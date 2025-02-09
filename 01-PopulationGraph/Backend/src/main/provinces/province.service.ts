import { IProvinces } from '@common-ifaces/main/provinces.iface'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { TAttributes } from '@utilities/helper-type.util'
import { queryGeneratorSql } from '@utilities/query-generator.util'
import { ServiceHelpers } from '@utilities/service-helper.util'
import { ProvinceSchema } from '@common-schemas/public/provinces.table'

const attributes: TAttributes<IProvinces> = {
  mf: ['id', 'province_code', 'province_name', 'created_at', 'updated_at'],
  bf: ['province_code', 'province_name', 'created_at', 'updated_at'],
  mnf: ['province_code', 'province_name'],
  lov: [
    ['province_code', 'value'],
    ['province_name', 'label']
  ]
}

@Injectable()
export class ProvinceService {
  constructor(
    @InjectModel(ProvinceSchema) private provinceSchema: typeof ProvinceSchema
  ) {}

  async getListProvinces(query: any) {
    const tmpAttributes = ServiceHelpers.getAttributes(attributes, query._mode)
    const querying = queryGeneratorSql(attributes.mf, query, false)

    return this.provinceSchema.findAll({
      attributes: tmpAttributes,
      ...querying,
      raw: true
    })
  }
}

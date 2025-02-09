import { IMonthlyPopulations } from '@common-ifaces/main/monthly_populations.iface'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { TAttributes } from '@utilities/helper-type.util'
import { MonthlyPopulationSchema } from '@common-schemas/public/monthly_populations.table'
import { PgNativeQuery } from '@native-query/postgres/pg-provider.query'
import { ProvinceSchema } from '@common-schemas/public/provinces.table'

const attributes: TAttributes<IMonthlyPopulations> = {
  mf: ['id', 'province_code', 'periode', 'value', 'created_at', 'updated_at'],
  bf: ['province_code', 'periode', 'value', 'created_at', 'updated_at'],
  mnf: ['province_code', 'periode', 'value']
}

@Injectable()
export class MonthlyPopulationService {
  constructor(
    @InjectModel(MonthlyPopulationSchema)
    private populationSchema: typeof MonthlyPopulationSchema,

    private nativeQuery: PgNativeQuery
  ) {}

  async getDataGraphPopulations(provinceCode: string) {
    return this.populationSchema.findAll({
      attributes: attributes.mnf,
      include: {
        model: ProvinceSchema,
        required: false,
        attributes: ['province_name']
      },
      subQuery: false,
      where: {
        province_code: provinceCode
      },
      raw: true
    })
  }

  async getTopOfIncreasingPopulationProvinces(periode: string) {
    return this.nativeQuery.execCustomQuery('top5IncreasingPopulation', {
      periode
    })
  }

  async getTopOfDecreasingPopulationProvinces(periode: string) {
    return this.nativeQuery.execCustomQuery('top5DecreasingPopulation', {
      periode
    })
  }
}

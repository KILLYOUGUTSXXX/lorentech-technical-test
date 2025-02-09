import { InjectConnection } from '@nestjs/sequelize'
import { QueryTypes, Sequelize, Transaction } from 'sequelize'
import * as top5Movement from './raws/top-5-movement'

const CustomQuery = {
  top5IncreasingPopulation: top5Movement.increasing,
  top5DecreasingPopulation: top5Movement.decreasing
}

export class PgNativeQuery {
  constructor(@InjectConnection() private connection: Sequelize) {}

  async execCustomQuery<T = any>(
    queryType: keyof typeof CustomQuery,
    replacements: { [P: string]: any },
    transaction: Transaction = null
  ): Promise<Array<T>> {
    try {
      const mappingQuery = CustomQuery[queryType].replace(
        /(\$)+([a-zA-Z_-]+)/g,
        m => {
          const current = replacements[m.replace(/\$/g, '')] || null

          if (typeof current === 'string') return `'${current}'`
          else if (typeof current === 'number') return current
          return current
        }
      )

      const result = await this.connection.query(mappingQuery, {
        // replacements,
        type: QueryTypes.SELECT,
        transaction: transaction
      })

      return result as any
    } catch (er) {
      throw new Error(`Failed to generate data, cause: ${er.message}.`)
    }
  }
}

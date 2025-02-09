import { Moment } from 'moment'
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  BelongsTo,
  ForeignKey,
  AfterFind
} from 'sequelize-typescript'
import { ProvinceSchema } from './provinces.table'

@Table({
  tableName: 'tbl_monthly_populations',
  timestamps: false,
  freezeTableName: true
})
export class MonthlyPopulationSchema extends Model {
  @AllowNull(true)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(8)
  })
  @ForeignKey(() => ProvinceSchema)
  province_code: string

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  /**ISO Date format : YYYY-MM-DD */
  periode: string

  @AllowNull(false)
  @Column(DataType.DECIMAL(19, 5))
  value: string

  @BelongsTo(() => ProvinceSchema, {
    foreignKey: 'province_code',
    targetKey: 'province_code'
  })
  provinces: ProvinceSchema

  @AllowNull(false)
  @Column(DataType.DATE)
  created_at: Moment

  @AllowNull(true)
  @Column(DataType.DATE)
  updated_at?: Moment

  @AfterFind
  static async afterFindHook(result: any | Array<any>): Promise<void> {
    if (Array.isArray(result)) {
      result.forEach(item => {
        if (!!item['provinces.province_name']) {
          item['province_name'] = item['provinces.province_name']
          delete item['provinces.province_name']
        }
      })
    } else {
      if (!!result['provinces.province_name']) {
        result['province_name'] = result['provinces.province_name']
        delete result['provinces.province_name']
      }
    }
  }
}

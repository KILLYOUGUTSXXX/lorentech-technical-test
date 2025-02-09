import { Moment } from 'moment'
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
  Unique
} from 'sequelize-typescript'
import { MonthlyPopulationSchema } from './monthly_populations.table'

@Table({
  tableName: 'tbl_provinces',
  timestamps: false,
  freezeTableName: true
})
export class ProvinceSchema extends Model {
  @AllowNull(true)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(8))
  province_code: string

  @AllowNull(false)
  @Column(DataType.STRING(30))
  province_name: string

  @AllowNull(false)
  @Column(DataType.DATE)
  created_at: Moment

  @HasMany(() => MonthlyPopulationSchema)
  populations: MonthlyPopulationSchema

  @AllowNull(true)
  @Column(DataType.DATE)
  updated_at?: Moment
}

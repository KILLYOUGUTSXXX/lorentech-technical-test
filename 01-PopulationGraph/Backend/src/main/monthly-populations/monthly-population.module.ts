import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { MonthlyPopulationController } from './monthly-population.controller'
import { MonthlyPopulationSchema } from '@common-schemas/public/monthly_populations.table'
import { PgNativeQuery } from '@native-query/postgres/pg-provider.query'
import { MonthlyPopulationService } from './monthly-population.service'

@Module({
  imports: [SequelizeModule.forFeature([MonthlyPopulationSchema])],
  controllers: [MonthlyPopulationController],
  providers: [PgNativeQuery, MonthlyPopulationService]
})
export class MonthlyPopulationModule {}

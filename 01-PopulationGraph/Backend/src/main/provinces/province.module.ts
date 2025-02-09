import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProvinceController } from './province.controller'
import { ProvinceService } from './province.service'
import { ProvinceSchema } from '@common-schemas/public/provinces.table'

@Module({
  imports: [SequelizeModule.forFeature([ProvinceSchema])],
  controllers: [ProvinceController],
  providers: [ProvinceService]
})
export class ProvinceModules {}

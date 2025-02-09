import { Module } from '@nestjs/common'
import { DatabaseConnection } from './pg.provider'

@Module({
  imports: [DatabaseConnection],
  exports: [DatabaseConnection]
})
export class MainPgModules {}

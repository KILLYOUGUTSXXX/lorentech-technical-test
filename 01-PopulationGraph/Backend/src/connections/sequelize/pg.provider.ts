import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import * as Sequelize from 'sequelize'

require('pg').defaults.parseInt8 = true
// set auto parse numeric / float
;((Sequelize.DataTypes as any)?.postgres as any).DECIMAL.parse =
  parseFloat as any

export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => {
    return {
      dialect: 'postgres',
      timezone: '+07:00',
      dialectOptions: {
        decimalNumbers: true
      },
      host: process.env['AFX_PG_URL'],
      port: parseInt(process.env['AFX_PG_PORT']),
      username: process.env['AFX_PG_USER'],
      password: process.env['AFX_PG_PSW'],
      database: process.env['AFX_PG_DBNAME'],
      logging: process.env['NEST_ENV'] === 'dev',
      autoLoadModels: true,
      synchronize: false
    }
  }
})

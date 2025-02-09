import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  InitMiddleware,
  ProtectMiddleware,
  RequestBodyMiddleware,
  ResponseMiddleware
} from '@middlewares'
import { FX_PUB, FxRouterModules } from '@fx-routers'
import { MainPgModules } from './connections/sequelize/pg.module'

// init base director
global.__basedir = __dirname

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NEST_ENV}`],
      isGlobal: true
    }),
    ...FxRouterModules.register(),
    MainPgModules
  ],
  controllers: [],
  providers: [FX_PUB]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        InitMiddleware,
        ResponseMiddleware,
        RequestBodyMiddleware,
        ProtectMiddleware
      )
      .forRoutes('*')
  }
}

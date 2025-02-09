import { MonthlyPopulationPath } from './paths/monthly-population.path'
import { ProvincePath } from './paths/provinces.path'

export const routes: FX_ROUTERS.TRouterConfigs[] = [
  {
    path: 'api/v1',
    children: [ProvincePath, MonthlyPopulationPath]
  }
]

import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common'
import { MonthlyPopulationService } from './monthly-population.service'
import { Response } from '@utilities/helper-type.util'

@Controller()
export class MonthlyPopulationController {
  constructor(private bookService: MonthlyPopulationService) {}

  @Get('graph')
  async getDataGraphPopulations(@Query() query: any, @Res() res: Response) {
    return this.bookService
      .getDataGraphPopulations(query?.provinceCode)
      .then(result => {
        return res.asJson(HttpStatus.OK, {
          message: 'OK',
          data: result
        })
      })
      .catch(er => {
        return res.asJson(
          HttpStatus.BAD_REQUEST,
          { message: '[C-POPULATION-01] Failed to load data population.' },
          { message: er.message }
        )
      })
  }

  @Get('increasing')
  async getTopOfIncreasingPopulationProvinces(
    @Query() query: any,
    @Res() res: Response
  ) {
    return this.bookService
      .getTopOfIncreasingPopulationProvinces(query?.periode)
      .then(result => {
        return res.asJson(HttpStatus.OK, {
          message: 'OK',
          data: result
        })
      })
      .catch(er => {
        return res.asJson(
          HttpStatus.BAD_REQUEST,
          { message: '[C-POPULATION-02] Failed to load data population.' },
          { message: er.message }
        )
      })
  }

  @Get('decreasing')
  async getTopOfDecreasingPopulationProvinces(
    @Query() query: any,
    @Res() res: Response
  ) {
    return this.bookService
      .getTopOfDecreasingPopulationProvinces(query?.periode)
      .then(result => {
        return res.asJson(HttpStatus.OK, {
          message: 'OK',
          data: result
        })
      })
      .catch(er => {
        return res.asJson(
          HttpStatus.BAD_REQUEST,
          { message: '[C-POPULATION-02] Failed to load data population.' },
          { message: er.message }
        )
      })
  }
}

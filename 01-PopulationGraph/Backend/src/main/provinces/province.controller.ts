import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common'
import { ProvinceService } from './province.service'
import { Response } from '@utilities/helper-type.util'

@Controller()
export class ProvinceController {
  constructor(private bookService: ProvinceService) {}

  @Get()
  async getListProvinces(@Query() query: any, @Res() res: Response) {
    return this.bookService
      .getListProvinces(query)
      .then(result => {
        return res.asJson(HttpStatus.OK, {
          message: 'OK',
          data: result
        })
      })
      .catch(er => {
        return res.asJson(
          HttpStatus.BAD_REQUEST,
          { message: '[C-PROVINCE-01] Failed to load data provinces.' },
          { message: er.message }
        )
      })
  }
}

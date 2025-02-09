import { ApiProperty } from "@nestjs/swagger";

export class DocumentationQueryFindData {
  @ApiProperty({ description: 'Opt: mf, bf, mnf, lov', default: 'mf' })
  _mode: 'mf' | 'bf' | 'mnf' | 'lov'

  @ApiProperty({ description: 'Number of current page', default: 1 })
  _page: number

  @ApiProperty({ description: 'Total data per page', default: 10 })
  _pageSize: number
}
const mainUrl = process.env['MAIN_API_HOST']

const MAIN_API = (path: string) => `${mainUrl}/api/v1/${path}`

export default {
  provinces: {
    main: MAIN_API('provinces')
  },
  population: {
    graph: MAIN_API('monthly-populations/graph'),
    increasing: MAIN_API('monthly-populations/increasing'),
    decreasing: MAIN_API('monthly-populations/decreasing')
  }
}

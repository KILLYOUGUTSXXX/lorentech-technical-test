import { AppModule } from '@app-module'
import { Test, TestingModule } from '@nestjs/testing'
import {
  ISequencePayload,
  ISharedTesting,
  TSequentiallyTesting
} from '@utilities/helper-test.util'
import { requestMock, IRequestMockCallback } from '@utilities/mock-request'
import * as path from 'path'
import { ValidationPipe } from '@nestjs/common'

const initPath = path.join(__dirname, 'integrations')
let registerFiles = []

try {
  registerFiles = require(path.join(
    __dirname,
    '_config',
    'register-files.json'
  ))
} catch (er) {
  registerFiles = []
}

type TReconditionSequentialFunction = {
  [K: string]: { classes: TSequentiallyTesting; path: string; fn_name: string }
}

describe('Sequential testing', () => {
  const shared: ISharedTesting = {
    token: null
  }
  let mockRequest: IRequestMockCallback
  let getCollection: () => void
  let modules: TestingModule

  const paramsTesting: ISequencePayload = {
    getDeps: () => ({ modules, getCollection, mockRequest }),
    getShared: () => shared,
    setShared: (key: string, values: any) =>
      Object.assign(shared, { [key]: values })
  }

  describe('Initialize Testing', () => {
    beforeEach(async () => {
      modules = await Test.createTestingModule({
        imports: [AppModule],
        providers: []
      }).compile()

      const app = modules.createNestApplication()
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

      await app.init()

      getCollection = () => {}
      mockRequest = requestMock(app.getHttpServer())
    })

    it('INIT SUCCESS', async () => {})
  })

  const flatFn: TReconditionSequentialFunction = loadFunctions()
  const tmpLists: any[] = []

  describe('Running up the test', () => {
    const flatKeys: string[] = Object.keys(flatFn).sort(
      (a: string, b: string) => +a - +b
    )
    for (const o in flatKeys) {
      const items: any = flatFn[flatKeys[o]]
      const [keys, ...pureFnName] = items.fn_name.split('_')

      tmpLists.push(
        `\x1b[94m\x1b[1m${
          +o + 1
        }. Running function[${keys}] test of \x1b[4m\x1b[37m${
          items.path
        } => ${pureFnName.join('')}\x1b[0m`
      )
      items.classes(paramsTesting)
    }
  })

  describe('Test Result', () => {
    afterEach(async () => {
      console.log(tmpLists.join('\n'))
    })
    it(`Total ${tmpLists.length} function test is compiled.`, async () => {})
  })
})

// Load all function from other allowed files before start the automation testing.
function loadFunctions() {
  try {
    const flatFn: any = {}
    for (const a in registerFiles) {
      const CurrClass = require(path.join(initPath, registerFiles[a]))
      for (const x in CurrClass) {
        if (
          CurrClass[x] instanceof Function &&
          x.match(/(\$[0-9]+)_[a-zA-Z0-9_]+/g)
        ) {
          // filter name of function, that can be as a testing stage.
          let [keys] = x.split('_')
          keys = keys.replace(/[^\d]/g, '')

          if (flatFn[keys]) {
            throw new Error(
              `\x1b[1m\x1b[41mConflict index of ${keys} for \x1b[37m\x1b[41m${registerFiles[a]} -> ${x}\x1b[0m`
            )
          }

          Object.assign(flatFn, {
            [keys]: {
              classes: CurrClass[x],
              path: registerFiles[a],
              fn_name: x
            }
          })
        }
      }
    }
    return flatFn
  } catch (er) {
    console.log(er.message)
    process.exit()
  }
}

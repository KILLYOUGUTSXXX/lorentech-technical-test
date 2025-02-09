import ShortUniqueId from 'short-unique-id'
import { TAttributes, TModeAttributes } from './helper-type.util'


interface IJoinDataReturn {
  data: Array<any>,
  leftJoinData: <SRC = any , TAR = any> (
    tarData: Array<TAR>,
    srcKey: keyof SRC | Array<keyof SRC>,
    tarKey: keyof TAR | Array<keyof TAR>,
    destructor: Array<keyof TAR | [src: keyof TAR, initial: string]>
  ) => IJoinDataReturn
}

interface IServiceHelpers {
  leftJoinData<SRC = any , TAR = any> (
    srcData: Array<SRC>,
    tarData: Array<TAR>,
    srcKey: keyof SRC | Array<keyof SRC>,
    tarKey: keyof TAR | Array<keyof TAR>,
    destructor: Array<keyof TAR | [src: keyof TAR, initial: string]>
  ): IJoinDataReturn,
  getAttributes(attributes: TAttributes<any>, mode: TModeAttributes): any[]
}




export class ServiceHelpers implements IServiceHelpers {
  getAttributes(attributes: TAttributes<any>, mode: 'mf' | 'bf' | 'mnf' | 'lov'): any[] { return []}
  leftJoinData<SRC = any, TAR = any>(...props: any): any {}

  static getAttributes(
    attributes: TAttributes<any>,
    mode: TModeAttributes
  ): any[] {
    try {
      const attrs = attributes[mode] || attributes.mnf

      if (!attrs) throw new Error("Attributes doesn't exists.")

      return attrs
    } catch {
      throw new Error('Failed to parse attributes.')
    }
  }

  static filterActiveOnly<T>(activeOnly: boolean, attr: keyof T, truthy?: any) {
    return activeOnly ? { [attr]: truthy ? truthy : true } : {}
  }

  static generateID(
    prefix: string,
    randomNum: number,
    seperate?: { delimeter: string; part: [number, number] } | undefined
  ) {
    try {
      let parseID: string = new ShortUniqueId({ length: randomNum })()
      if (seperate) {
        if (seperate.part[0] > seperate.part[1])
          throw new Error('Wrong scale of seperate part.')
        parseID = parseID
          .match(new RegExp(`.{${seperate.part[0]},${seperate.part[1]}}`, 'g'))
          .join(seperate.delimeter)
      }

      return `${prefix}${parseID}`
    } catch (er) {
      throw new Error(er.message)
    }
  }

  private static destructJoinData (data: any, destructor: Array<any>): any {
    return destructor.reduce((a, b) => ({
      ...a,
      [typeof b === 'string' ? b : b[1]]: typeof b === 'string' ? data?.[b] : data?.[b[0]]
    }), {})
  }

  private static buildKeyJoin (data: any, key: string): string {
    return key.replace(new RegExp(Object.keys(data).join('|'), 'g'), m => data?.[m])
  }

  static leftJoinData
    <SRC = any , TAR = any> (
    srcData: Array<SRC>,
    tarData: Array<TAR>,
    srcKey: keyof SRC | Array<keyof SRC>,
    tarKey: keyof TAR | Array<keyof TAR>,
    destructor: Array<keyof TAR | [src: keyof TAR, initial: string]>
  ) {
    let _srcKey: string = typeof srcKey === 'string' ? srcKey : (srcKey as Array<string>).join('#')
    let _tarKey: string = typeof tarKey === 'string' ? tarKey : (tarKey as Array<string>).join('#')

    const objJoin: { [P: string]: any } = tarData.reduce(
        (a, b: any) => ({ ...a, [this.buildKeyJoin(b, _tarKey)]: b }
      ), {})
    
    const dataResult = srcData.map(a => ({
      ...a,
      ...this.destructJoinData(objJoin[this.buildKeyJoin(a, _srcKey)], destructor)
    }))

    return ({
      data: dataResult,
      leftJoinData: <xS = any, xT = any>(
        xtarData: Array<xT>,
        xsrcKey:  keyof xS | Array<keyof xS>,
        xtarKey:  keyof xT | Array<keyof xT>,
        xdestructor: Array<keyof xT | [src: keyof xT, initial: string]>
      ) => this.leftJoinData(
        dataResult,
        xtarData,
        xsrcKey,
        xtarKey,
        xdestructor as any
      )
    })
  }
}

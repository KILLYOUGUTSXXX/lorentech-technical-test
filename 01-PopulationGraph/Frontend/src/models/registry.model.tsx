'use client'
import { registerModels } from './main.provider'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { IModelDefinitions } from '@afx/interfaces/global.iface'

let globalPath: string | null = null
let indexModelSubscriptions: Array<string> = []

export function useLynxModel<T = any>(
  Components: (props: any) => JSX.Element,
  models: () => Array<IModelDefinitions<any, any>>
): React.FunctionComponent<T> {
  return props => {
    const pathname = usePathname()
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      if (globalPath !== pathname) {
        globalPath = pathname
        indexModelSubscriptions = []
      }

      registerModels(models, (model, subscriptions) => {
        if (
          typeof subscriptions === 'function' &&
          indexModelSubscriptions.indexOf(model) === -1
        ) {
          indexModelSubscriptions.push(model)
          return subscriptions({ pathname })
        }
      })
    }, [pathname])

    return mounted && <Components {...props} />
  }
}

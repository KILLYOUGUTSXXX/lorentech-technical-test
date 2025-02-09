'use client'
import { useLynxModel } from '@lynx/model-reg'
import BaseLayout from './main.layout'

export default useLynxModel(BaseLayout, () => [
  require('@lynx/models/main/province.model').default,
  require('@lynx/models/main/population.model').default
])

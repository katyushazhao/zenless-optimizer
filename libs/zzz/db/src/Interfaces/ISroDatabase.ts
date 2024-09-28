import { type IZZZObjectDescription } from '@genshin-optimizer/zzz/zzzod'

export const ZZZoSource = 'Zenless Zone Zero Optimizer' as const
export const ZZZoFormat = 'ZZZO' as const

export interface IZZZoDatabase extends IZZZObjectDescription {
  version: 1
  dbVersion: number
  source: typeof ZZZoSource
  // buildSettings?: Array<BuildSetting & { id: string }>
  [zzzoSettingsKey: string]: unknown
}

import type { WEngineKey, UpgradeKey, PromotionKey, LocationKey } from '@genshin-optimizer/zzz/consts'

export interface IWEngine {
  key: WEngineKey
  level: number
  promotion: PromotionKey
  upgrade: UpgradeKey
  location: LocationKey
  lock: boolean
}

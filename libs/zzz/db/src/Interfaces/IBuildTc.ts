import type {
  PromotionKey,
  WEngineKey,
  DriveDiscMainStatKey,
  DriveDiscSeriesKey,
  DriveDiscPartitionKey,
  DriveDiscSubStatKey,
  UpgradeKey,
} from '@genshin-optimizer/zzz/consts'

export type BuildTcDriveDiscPartition = {
  level: number
  statKey: DriveDiscMainStatKey
}
export interface IBuildTc {
  name: string
  description: string
  wEngine?: {
    key: WEngineKey
    level: number
    promotion: PromotionKey
    upgrade: UpgradeKey
  }
  drivedisc: {
    partitions: Record<DriveDiscPartitionKey, BuildTcDriveDiscPartition>
    substats: {
      stats: Record<DriveDiscSubStatKey, number>
    }
    seriess: Partial<Record<DriveDiscSeriesKey, 2 | 4>>
  }
  optimization: {
    distributedSubStats: number
    maxSubStats: Record<DriveDiscSubStatKey, number>
  }
}

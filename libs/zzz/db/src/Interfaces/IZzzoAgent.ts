import type { DriveDiscPartitionKey } from '@genshin-optimizer/zzz/consts'
import type { IAgent } from '@genshin-optimizer/zzz/zzzod'

export interface ICachedAgent extends IAgent {
  equippedDriveDiscs: Record<DriveDiscPartitionKey, string>
  equippedWEngine?: string
}

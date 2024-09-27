import type {
  WEngineKey,
  DriveDiscSeriesKey,
  DriveDiscPartitionKey,
  AgentKey,
} from '@genshin-optimizer/zzz/consts'
import agents from './gen/agents'
import wEngines from './gen/wEngines'
import drivediscs from './gen/drivediscs'
type agentAssetKey =
  | 'icon'
  | 'basic'
  | 'dodge'
  | 'assist'
  | 'special'
  | 'chain'
  | 'core'
  | 'mindscape1'
  | 'mindscape2'
  | 'mindscape3'
  | 'mindscape4'
  | 'mindscape5'
  | 'mindscape6'

export function agentAsset(ck: AgentKey, asset: agentAssetKey) {
  return agents[ck][asset]
}
type WEngineAssetKey = 'icon' | 'cover'
export function wEngineAsset(lck: WEngineKey, asset: WEngineAssetKey) {
  return wEngines[lck][asset]
}

export function drivediscAsset(rk: DriveDiscSeriesKey, partitionKey: DriveDiscPartitionKey) {
  const drivedisc = drivediscs[rk]

  return drivedisc[partitionKey as keyof typeof drivedisc]
}

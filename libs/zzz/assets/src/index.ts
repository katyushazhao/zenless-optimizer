import type {
  WEngineKey,
  DriveDiscSeriesKey,
  DriveDiscPartitionKey,
  AgentKey,
} from '@genshin-optimizer/zzz/consts'
import agents from './gen/agents'
import wEngines from './gen/wEngines'
import driveDiscs from './gen/driveDiscs'

type agentAssetKey =
  | 'icon'
  | 'basic1'
  | 'dodge1'
  | 'assist1'
  | 'special1'
  | 'chain1'
  | 'core1'
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

export function driveDiscAsset(rk: DriveDiscSeriesKey, partitionKey: DriveDiscPartitionKey) {
  const driveDisc = driveDiscs[rk]

  return driveDisc[partitionKey as keyof typeof driveDisc]
}

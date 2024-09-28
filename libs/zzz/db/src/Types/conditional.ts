import type {
  AgentKey,
  WEngineKey,
  DriveDiscSeriesKey,
} from '@genshin-optimizer/zzz/consts'

type SheetKey = AgentKey | DriveDiscSeriesKey | WEngineKey
// Stored per-char loadout, so the dst is assumed to be the owning char
// CharKey|'all' is the zzzcKey
// SheetKey is the SheetKey
// condkey is the condKey
// value is the condValue
export type ConditionalValues = Partial<
  Record<
    AgentKey | 'all',
    Partial<Record<SheetKey, { [condkey: string]: number }>>
  >
>

import type { FilterConfigs, SortConfigs } from '@genshin-optimizer/common/util'
import type { IWEngine } from '@genshin-optimizer/zzz/zzzod'
// import { allStats } from '@genshin-optimizer/zzz/stats' // TODO: Update this import once zzz/stats is available

export const wEngineSortKeys = ['level', 'name']//, 'rarity'] as const // TODO: Update this once zzz/stats is available
export type WEngineSortKey = (typeof wEngineSortKeys)[number]

// TODO: ZZZO currently has NO i18n at the moment.
// All `name` functions must have the generated LC key names
// wrapped with i18n.t() once it is implemented

export function wEngineSortConfigs(): SortConfigs<
  WEngineSortKey,
  IWEngine
> {
  return {
    level: (lc) => lc.level * (lc.promotion + 1),
    name: (lc) => `wEngineNames_gen:${lc.key}` as string,
    // rarity: (lc) => allStats.wEngine[lc.key].rarity, // TODO: Update this once zzz/stats is available
  }
}
export function wEngineFilterConfigs(): FilterConfigs<
  'name', //| 'specialty'| 'rarity', // TODO: Update this once zzz/stats is available
  IWEngine
> {
  return {
    // rarity: (lc, filter) => filter.includes(allStats.wEngine[lc.key].rarity), // TODO: Update this once zzz/stats is available
    name: (lc, filter) =>
      `wEngineNames_gen:${lc.key}`
        .toLowerCase()
        .includes(filter.toLowerCase()),
    // specialty: (lc, filter) => filter.includes(allStats.wEngine[lc.key].specialty), // TODO: Update this once zzz/stats is available
  }
}

export const wEngineSortMap: Partial<
  Record<WEngineSortKey, WEngineSortKey[]>
> = {
  name: ['name'],
  level: ['level', 'rarity', 'name'],
  rarity: ['rarity', 'level', 'name'],
}

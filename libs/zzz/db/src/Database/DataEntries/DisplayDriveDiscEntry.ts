import { clamp, validateArr } from '@genshin-optimizer/common/util'
import type {
  LocationKey,
  DriveDiscMainStatKey,
  DriveDiscRarityKey,
  DriveDiscSeriesKey,
  DriveDiscPartitionKey,
  DriveDiscSubStatKey,
} from '@genshin-optimizer/zzz/consts'
import {
  allLocationKeys,
  allDriveDiscRarityKeys,
  allDriveDiscSeriesKeys,
  allDriveDiscPartitionKeys,
  allDriveDiscSubStatKeys,
} from '@genshin-optimizer/zzz/consts'

import { DataEntry } from '../DataEntry'
import type { ZZZoDatabase } from '../Database'

export const drivediscSortKeys = [
  'rarity',
  'level',
  'drivediscserieskey',
  'efficiency',
  'mefficiency',
] as const
export type DriveDiscSortKey = (typeof drivediscSortKeys)[number]

export type FilterOption = {
  drivediscSeriesKeys: DriveDiscSeriesKey[]
  rarity: DriveDiscRarityKey[]
  levelLow: number
  levelHigh: number
  partitionKeys: DriveDiscPartitionKey[]
  mainStatKeys: DriveDiscMainStatKey[]
  substats: DriveDiscSubStatKey[]
  locations: LocationKey[]
  showEquipped: boolean
  showInventory: boolean
  locked: Array<'locked' | 'unlocked'>
  rvLow: number
  rvHigh: number
  useMaxRV: boolean
  lines: Array<1 | 2 | 3 | 4>
}

export type IDisplayDriveDisc = {
  filterOption: FilterOption
  ascending: boolean
  sortType: DriveDiscSortKey
  effFilter: DriveDiscSubStatKey[]
}

export function initialFilterOption(): FilterOption {
  return {
    drivediscSeriesKeys: [],
    rarity: [...allDriveDiscRarityKeys],
    levelLow: 0,
    levelHigh: 15,
    partitionKeys: [...allDriveDiscPartitionKeys],
    mainStatKeys: [],
    substats: [],
    locations: [],
    showEquipped: true,
    showInventory: true,
    locked: ['locked', 'unlocked'],
    rvLow: 0,
    rvHigh: 900, // TODO: Figure out RVs for ZZZO
    useMaxRV: false,
    lines: [1, 2, 3, 4],
  }
}

function initialState(): IDisplayDriveDisc {
  return {
    filterOption: initialFilterOption(),
    ascending: false,
    sortType: drivediscSortKeys[0],
    effFilter: [...allDriveDiscSubStatKeys],
  }
}

export class DisplayDriveDiscEntry extends DataEntry<
  'display_drivedisc',
  'display_drivedisc',
  IDisplayDriveDisc,
  IDisplayDriveDisc
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'display_drivedisc', initialState, 'display_drivedisc')
  }
  override validate(obj: unknown): IDisplayDriveDisc | undefined {
    if (typeof obj !== 'object') return undefined
    let { filterOption, ascending, sortType, effFilter } = obj as IDisplayDriveDisc

    if (typeof filterOption !== 'object') filterOption = initialFilterOption()
    else {
      let {
        drivediscSeriesKeys,
        rarity,
        levelLow,
        levelHigh,
        partitionKeys,
        mainStatKeys,
        substats,
        locations,
        showEquipped,
        showInventory,
        locked,
        rvLow,
        rvHigh,
        useMaxRV,
        lines,
      } = filterOption
      drivediscSeriesKeys = validateArr(drivediscSeriesKeys, allDriveDiscSeriesKeys, [])
      rarity = validateArr(rarity, allDriveDiscRarityKeys)

      if (typeof levelLow !== 'number') levelLow = 0
      else levelLow = clamp(levelLow, 0, 15)
      if (typeof levelHigh !== 'number') levelHigh = 0
      else levelHigh = clamp(levelHigh, 0, 15)

      partitionKeys = validateArr(partitionKeys, allDriveDiscPartitionKeys)
      mainStatKeys = validateArr(mainStatKeys, mainStatKeys, [])
      substats = validateArr(substats, allDriveDiscSubStatKeys, [])
      locations = validateArr(locations, allLocationKeys, [])
      if (typeof showEquipped !== 'boolean') showEquipped = true
      if (typeof showInventory !== 'boolean') showInventory = true
      locked = validateArr(locked, ['locked', 'unlocked'])

      if (typeof rvLow !== 'number') rvLow = 0
      if (typeof rvHigh !== 'number') rvHigh = 900 // TODO: Figure out RVs for ZZZO

      if (typeof useMaxRV !== 'boolean') useMaxRV = false

      lines = validateArr(lines, [1, 2, 3, 4])

      filterOption = {
        drivediscSeriesKeys,
        rarity,
        levelLow,
        levelHigh,
        partitionKeys,
        mainStatKeys,
        substats,
        locations,
        showEquipped,
        showInventory,
        locked,
        rvLow,
        rvHigh,
        useMaxRV,
        lines,
      } as FilterOption
    }

    if (typeof ascending !== 'boolean') ascending = false
    if (!drivediscSortKeys.includes(sortType)) sortType = drivediscSortKeys[0]

    effFilter = validateArr(effFilter, allDriveDiscSubStatKeys)

    return {
      filterOption,
      ascending,
      sortType,
      effFilter,
    } as IDisplayDriveDisc
  }
  override set(
    value:
      | Partial<IDisplayDriveDisc>
      | ((v: IDisplayDriveDisc) => Partial<IDisplayDriveDisc> | void)
      | { action: 'reset' }
  ): boolean {
    if ('action' in value) {
      if (value.action === 'reset')
        return super.set({ filterOption: initialFilterOption() })
      return false
    } else return super.set(value)
  }
}

import type { SpecialtyKey, RarityKey } from '@genshin-optimizer/zzz/consts'
import { allSpecialtyKeys, allRarityKeys } from '@genshin-optimizer/zzz/consts'
import { DataEntry } from '../DataEntry'
import type { ZZZoDatabase } from '../Database'

export const wEngineSortKeys = ['level', 'rarity', 'name'] as const
export type WEngineSortKey = (typeof wEngineSortKeys)[number]
export interface IDisplayWEngine {
  sortType: WEngineSortKey
  ascending: boolean
  rarity: RarityKey[]
  specialty: SpecialtyKey[]
}

const initialState = () => ({
  sortType: wEngineSortKeys[0],
  ascending: false,
  rarity: [...allRarityKeys],
  specialty: [...allSpecialtyKeys],
})

export class DisplayWEngineEntry extends DataEntry<
  'display_wengine',
  'display_wengine',
  IDisplayWEngine,
  IDisplayWEngine
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'display_wengine', initialState, 'display_wengine')
  }
  override validate(obj: any): IDisplayWEngine | undefined {
    if (typeof obj !== 'object') return undefined
    let { sortType, ascending, rarity, specialty } = obj
    if (
      typeof sortType !== 'string' ||
      !wEngineSortKeys.includes(sortType as any)
    )
      sortType = wEngineSortKeys[0]
    if (typeof ascending !== 'boolean') ascending = false
    if (!Array.isArray(rarity)) rarity = [...allRarityKeys]
    else rarity = rarity.filter((r) => allRarityKeys.includes(r))
    if (!Array.isArray(specialty)) specialty = [...allSpecialtyKeys]
    else specialty = specialty.filter((r) => allSpecialtyKeys.includes(r))
    const data: IDisplayWEngine = {
      sortType,
      ascending,
      rarity,
      specialty,
    }
    return data
  }
}

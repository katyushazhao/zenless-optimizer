import { validateArr } from '@genshin-optimizer/common/util'
import type {
  AnomalyTypeKey,
  SpecialtyKey,
  RarityKey,
} from '@genshin-optimizer/zzz/consts'
import {
  allAnomalyTypeKeys,
  allSpecialtyKeys,
  allRarityKeys,
} from '@genshin-optimizer/zzz/consts'
import { DataEntry } from '../DataEntry'
import type { ZZZoDatabase } from '../Database'

export const characterSortKeys = [
  'new',
  'level',
  'rarity',
  'name',
  'favorite',
] as const
export type CharacterSortKey = (typeof characterSortKeys)[number]

export interface IDisplayCharacterEntry {
  sortType: CharacterSortKey
  ascending: boolean
  specialty: SpecialtyKey[]
  anomalyType: AnomalyTypeKey[]
  rarity: RarityKey[]
}

const initialState = (): IDisplayCharacterEntry => ({
  sortType: 'level',
  ascending: false,
  specialty: [...allSpecialtyKeys],
  anomalyType: [...allAnomalyTypeKeys],
  rarity: [...allRarityKeys],
})

export class DisplayCharacterEntry extends DataEntry<
  'display_character',
  'display_character',
  IDisplayCharacterEntry,
  IDisplayCharacterEntry
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'display_character', initialState, 'display_character')
  }
  override validate(obj: any): IDisplayCharacterEntry | undefined {
    if (typeof obj !== 'object') return undefined
    let { sortType, ascending, specialty, anomalyType, rarity } = obj

    //Disallow sorting by "new" explicitly.
    if (sortType === 'new' || !characterSortKeys.includes(sortType))
      sortType = 'level'
    if (typeof ascending !== 'boolean') ascending = false
    specialty = validateArr(specialty, allSpecialtyKeys)
    anomalyType = validateArr(anomalyType, allAnomalyTypeKeys)
    rarity = validateArr(rarity, allRarityKeys)

    const data: IDisplayCharacterEntry = {
      sortType,
      ascending,
      specialty,
      anomalyType,
      rarity,
    }
    return data
  }
}

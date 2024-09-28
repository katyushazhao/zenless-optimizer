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

export const agentSortKeys = [
  'new',
  'level',
  'rarity',
  'name',
  'favorite',
] as const
export type AgentSortKey = (typeof agentSortKeys)[number]

export interface IDisplayAgentEntry {
  sortType: AgentSortKey
  ascending: boolean
  specialty: SpecialtyKey[]
  anomalyType: AnomalyTypeKey[]
  rarity: RarityKey[]
}

const initialState = (): IDisplayAgentEntry => ({
  sortType: 'level',
  ascending: false,
  specialty: [...allSpecialtyKeys],
  anomalyType: [...allAnomalyTypeKeys],
  rarity: [...allRarityKeys],
})

export class DisplayAgentEntry extends DataEntry<
  'display_agent',
  'display_agent',
  IDisplayAgentEntry,
  IDisplayAgentEntry
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'display_agent', initialState, 'display_agent')
  }
  override validate(obj: any): IDisplayAgentEntry | undefined {
    if (typeof obj !== 'object') return undefined
    let { sortType, ascending, specialty, anomalyType, rarity } = obj

    //Disallow sorting by "new" explicitly.
    if (sortType === 'new' || !agentSortKeys.includes(sortType))
      sortType = 'level'
    if (typeof ascending !== 'boolean') ascending = false
    specialty = validateArr(specialty, allSpecialtyKeys)
    anomalyType = validateArr(anomalyType, allAnomalyTypeKeys)
    rarity = validateArr(rarity, allRarityKeys)

    const data: IDisplayAgentEntry = {
      sortType,
      ascending,
      specialty,
      anomalyType,
      rarity,
    }
    return data
  }
}

import { deepFreeze } from '@genshin-optimizer/common/util'
import type { AgentKey } from '@genshin-optimizer/zzz/consts'
import { DataManager } from '../DataManager'
import type { ZZZoDatabase } from '../Database'

interface IAgentMeta {
  favorite: boolean
}
const initAgentMeta: IAgentMeta = deepFreeze({
  favorite: false,
})

export class AgentMetaDataManager extends DataManager<
  AgentKey,
  'agentMetas',
  IAgentMeta,
  IAgentMeta
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'agentMetas')
  }
  override validate(obj: any): IAgentMeta | undefined {
    if (typeof obj !== 'object') return undefined

    let { favorite } = obj
    if (typeof favorite !== 'boolean') favorite = false
    return { favorite }
  }
  override get(key: AgentKey): IAgentMeta {
    return this.data[key] ?? initAgentMeta
  }
}

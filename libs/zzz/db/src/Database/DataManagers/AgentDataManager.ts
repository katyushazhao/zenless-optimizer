import type { TriggerString } from '@genshin-optimizer/common/database'
import { clamp, deepClone, objKeyMap } from '@genshin-optimizer/common/util'
import type { AgentKey, DriveDiscPartitionKey } from '@genshin-optimizer/zzz/consts'
import {
  agentKeys,
  allDriveDiscPartitionKeys,
} from '@genshin-optimizer/zzz/consts'
import type {
  IAgent,
  IZZZObjectDescription,
} from '@genshin-optimizer/zzz/zzzod'
import { validateLevelAsc } from '@genshin-optimizer/zzz/util'
import type { ICachedAgent, IZZZoDatabase } from '../../Interfaces'
import { ZZZoSource } from '../../Interfaces'
import { DataManager } from '../DataManager'
import type { ZZZoDatabase } from '../Database'
import type { ImportResult } from '../exim'

export class AgentDataManager extends DataManager<
  AgentKey,
  'agents',
  ICachedAgent,
  IAgent
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'agents')
  }
  override validate(obj: unknown): IAgent | undefined {
    if (!obj || typeof obj !== 'object') return undefined
    const {
      key: agentKey,
      level: rawLevel,
      promotion: rawPromotion,
    } = obj as IAgent
    let { basic, dodge, assist, special, chain, core, mindscape } =
      obj as IAgent

    if (!agentKeys.includes(agentKey)) return undefined // non-recoverable

    if (typeof mindscape !== 'number' && mindscape < 0 && mindscape > 6) mindscape = 0

    const { level, promotion } = validateLevelAsc(rawLevel, rawPromotion)

    basic = typeof basic !== 'number' ? 1 : clamp(basic, 1, 12)
    dodge = typeof dodge !== 'number' ? 1 : clamp(dodge, 1, 12)
    assist = typeof assist !== 'number' ? 1 : clamp(assist, 1, 12)
    special = typeof special !== 'number' ? 1 : clamp(special, 1, 12)
    chain = typeof chain !== 'number' ? 1 : clamp(chain, 1, 12)
    core = typeof core !== 'number' ? 1 : clamp(core, 1, 12)

    const char: IAgent = {
      key: agentKey,
      level,
      promotion,
      basic,
      dodge,
      assist,
      special,
      chain,
      core,
      mindscape,
    }
    return char
  }
  override toCache(storageObj: IAgent, id: AgentKey): ICachedAgent {
    const oldChar = this.get(id)
    return {
      equippedDriveDiscs: oldChar
        ? oldChar.equippedDriveDiscs
        : objKeyMap(
            allDriveDiscPartitionKeys,
            (sk) =>
              Object.values(this.database.driveDiscs?.data ?? {}).find(
                (r) => r?.location === id && r.partition === sk
              )?.id ?? ''
          ),
      equippedWEngine: oldChar
        ? oldChar.equippedWEngine
        : Object.values(this.database.wEngines?.data ?? {}).find(
            (lc) => lc?.location === id
          )?.id ?? '',
      ...storageObj,
    }
  }
  override deCache(char: ICachedAgent): IAgent {
    const {
      key,
      level,
      promotion,
      basic,
      dodge,
      assist,
      special,
      chain,
      core,
      mindscape,
    } = char
    const result: IAgent = {
      key,
      level,
      promotion,
      basic,
      dodge,
      assist,
      special,
      chain,
      core,
      mindscape,
    }
    return result
  }
  // These overrides allow AgentKey to be used as id.
  // This assumes we only support one copy of a agent in a DB.
  override toStorageKey(key: string): string {
    return `${this.goKeySingle}_${key}`
  }
  override toCacheKey(key: string): AgentKey {
    return key.split(`${this.goKeySingle}_`)[1] as AgentKey
  }
  getOrCreate(key: AgentKey): ICachedAgent {
    if (!this.keys.includes(key)) {
      this.set(key, initialAgent(key))
    }
    return this.get(key) as ICachedAgent
  }

  override remove(key: AgentKey): ICachedAgent | undefined {
    const char = this.get(key)
    if (!char) return undefined
    for (const drivediscKey of Object.values(char.equippedDriveDiscs)) {
      const drivedisc = this.database.driveDiscs.get(drivediscKey)
      if (drivedisc && drivedisc.location === key)
        this.database.driveDiscs.setCached(drivediscKey, { ...drivedisc, location: '' })
    }
    const wEngine = this.database.wEngines.get(char.equippedWEngine)
    if (wEngine && wEngine.location === key && char.equippedWEngine)
      this.database.wEngines.setCached(char.equippedWEngine, {
        ...wEngine,
        location: '',
      })
    return super.remove(key)
  }

  /**
   * **Caution**:
   * This does not update the `location` on drivedisc
   * This function should be use internally for database to maintain cache on ICachedZZZoAgent.
   */
  setEquippedDriveDisc(key: AgentKey, partition: DriveDiscPartitionKey, drivediscId: string) {
    const char = super.get(key)
    if (!char) return
    const equippedDriveDiscs = deepClone(char.equippedDriveDiscs)
    equippedDriveDiscs[partition] = drivediscId
    super.setCached(key, { ...char, equippedDriveDiscs })
  }

  /**
   * **Caution**:
   * This does not update the `location` on light cone
   * This function should be use internally for database to maintain cache on ICachedZZZoAgent.
   */
  setEquippedWEngine(
    key: AgentKey,
    equippedWEngine: ICachedAgent['equippedWEngine']
  ) {
    const char = super.get(key)
    if (!char) return
    super.setCached(key, { ...char, equippedWEngine })
  }

  hasDup(char: IAgent, isZZZo: boolean) {
    const db = this.getStorage(char.key)
    if (!db) return false
    if (isZZZo) {
      return JSON.stringify(db) === JSON.stringify(char)
    } else {
      let {
        key,
        level,
        mindscape,
        promotion,
        basic,
        dodge,
        assist,
        special,
        chain,
        core,
      } = db
      const dbZZZ = {
        key,
        level,
        mindscape,
        promotion,
        basic,
        dodge,
        assist,
        special,
        chain,
        core,
      }
      ;({
        key,
        level,
        mindscape,
        promotion,
        basic,
        dodge,
        assist,
        special,
        chain,
        core,
      } = char)
      const charZZZ = {
        key,
        level,
        mindscape,
        promotion,
        basic,
        dodge,
        assist,
        special,
        chain,
        core,
      }
      return JSON.stringify(dbZZZ) === JSON.stringify(charZZZ)
    }
  }
  triggerAgent(key: AgentKey, reason: TriggerString) {
    this.trigger(key, reason, this.get(key))
  }
  override importZZZOD(
    zzz: IZZZObjectDescription & IZZZoDatabase,
    result: ImportResult
  ) {
    result.agents.beforeMerge = this.values.length

    const source = zzz.source ?? 'Unknown'
    const agents = zzz.agents
    if (Array.isArray(agents) && agents?.length) {
      result.agents.import = agents.length
      const idsToRemove = new Set(this.keys)
      agents.forEach((c) => {
        if (!c.key) result.agents.invalid.push(c as ICachedAgent)
        idsToRemove.delete(c.key)
        if (
          this.hasDup(
            { ...initialAgent(c.key), ...c },
            source === ZZZoSource
          )
        )
          result.agents.unchanged.push(c as ICachedAgent)
        else this.set(c.key, c)
      })

      const idtoRemoveArr = Array.from(idsToRemove)
      if (result.keepNotInImport || result.ignoreDups)
        result.agents.notInImport = idtoRemoveArr.length
      else idtoRemoveArr.forEach((k) => this.remove(k))
      result.agents.unchanged = []
    } else result.agents.notInImport = this.values.length
  }
}

export function initialAgent(key: AgentKey): ICachedAgent {
  return {
    key,
    level: 1,
    mindscape: 0,
    promotion: 0,
    basic: 1,
    dodge: 1,
    assist: 1,
    special: 1,
    chain: 1,
    core: 1,
    equippedDriveDiscs: objKeyMap(allDriveDiscPartitionKeys, () => ''),
    equippedWEngine: '',
  }
}

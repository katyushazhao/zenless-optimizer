import type { AgentKey } from '@genshin-optimizer/zzz/consts'
import {
  agentKeys,
  allWEngineKeys,
  wEngineMaxLevel,
} from '@genshin-optimizer/zzz/consts'
import type {
  IWEngine,
  IZZZObjectDescription,
} from '@genshin-optimizer/zzz/zzzod'
import { validateLevelPromotion } from '@genshin-optimizer/zzz/util'
import type {
  ICachedAgent,
  ICachedWEngine,
  IZZZoDatabase,
} from '../../Interfaces'
import { DataManager } from '../DataManager'
import type { ZZZoDatabase } from '../Database'
import type { ImportResult } from '../exim'
import { initialAgent } from './AgentDataManager'

export class WEngineDataManager extends DataManager<
  string,
  'wEngines',
  ICachedWEngine,
  IWEngine
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'wEngines')
  }
  override validate(obj: unknown): IWEngine | undefined {
    return validateWEngine(obj)
  }
  override toCache(
    storageObj: IWEngine,
    id: string
  ): ICachedWEngine | undefined {
    const newWEngine = { ...storageObj, id }
    const oldWEngine = super.get(id)

    // During initialization of the database, if you import wEngines with location without a corresponding agent, the agent will be generated here.
    const getWithInit = (cKey: AgentKey): ICachedAgent => {
      if (!this.database.agents.keys.includes(cKey))
        this.database.agents.set(cKey, initialAgent(cKey))
      return this.database.agents.get(cKey) as ICachedAgent
    }
    if (newWEngine.location !== oldWEngine?.location) {
      const prevAgent = oldWEngine?.location
        ? getWithInit(oldWEngine.location)
        : undefined
      const newAgent = newWEngine.location
        ? getWithInit(newWEngine.location)
        : undefined

      // previously equipped light cone at new location
      let prevWEngine = super.get(newAgent?.equippedWEngine)

      //current prevWEngine <-> newAgent  && newWEngine <-> prevAgent
      //swap to prevWEngine <-> prevAgent && newWEngine <-> newAgent(outside of this if)

      if (prevWEngine)
        super.setCached(prevWEngine.id, {
          ...prevWEngine,
          location: prevAgent?.key ?? '',
        })
      else if (prevAgent?.key) prevWEngine = undefined

      if (newAgent)
        this.database.agents.setEquippedWEngine(newAgent.key, newWEngine.id)
      if (prevAgent)
        this.database.agents.setEquippedWEngine(
          prevAgent.key,
          prevWEngine?.id
        )
    } else
      newWEngine.location &&
        this.database.agents.triggerAgent(newWEngine.location, 'update')
    return newWEngine
  }
  override deCache(wEngine: ICachedWEngine): IWEngine {
    const { key, level, promotion, upgrade, location, lock } = wEngine
    return { key, level, promotion, upgrade, location, lock }
  }

  new(value: IWEngine): string {
    const id = this.generateKey()
    this.set(id, value)
    return id
  }
  override remove(key: string, notify = true): ICachedWEngine | undefined {
    const lc = super.remove(key, notify)
    if (lc)
      lc.location && this.database.agents.setEquippedWEngine(lc.location, '')
    return lc
  }
  override importZZZOD(
    zzzod: IZZZObjectDescription & IZZZoDatabase,
    result: ImportResult
  ) {
    result.wEngines.beforeMerge = this.values.length

    // Match wEngines for counter, metadata, and locations.
    const wEngines = zzzod.wEngines

    if (!Array.isArray(wEngines) || !wEngines.length) {
      result.wEngines.notInImport = this.values.length
      return
    }

    const takenIds = new Set(this.keys)
    wEngines.forEach((a) => {
      const id = (a as ICachedWEngine).id
      if (!id) return
      takenIds.add(id)
    })

    result.wEngines.import = wEngines.length
    const idsToRemove = new Set(this.values.map((w) => w.id))
    const hasEquipment = wEngines.some((w) => w.location)
    wEngines.forEach((w): void => {
      const wEngine = this.validate(w)
      if (!wEngine) {
        result.wEngines.invalid.push(w)
        return
      }

      let importWEngine = wEngine
      let importId: string | undefined = (w as ICachedWEngine).id
      let foundDupOrUpgrade = false
      if (!result.ignoreDups) {
        const { duplicated, upgraded } = this.findDups(
          wEngine,
          Array.from(idsToRemove)
        )
        if (duplicated[0] || upgraded[0]) {
          foundDupOrUpgrade = true
          // Favor upgrades with the same location, else use 1st dupe
          let [match, isUpgrade] =
            hasEquipment &&
            wEngine.location &&
            upgraded[0]?.location === wEngine.location
              ? [upgraded[0], true]
              : duplicated[0]
              ? [duplicated[0], false]
              : [upgraded[0], true]
          if (importId) {
            // favor exact id matches
            const up = upgraded.find((w) => w.id === importId)
            if (up) [match, isUpgrade] = [up, true]
            const dup = duplicated.find((w) => w.id === importId)
            if (dup) [match, isUpgrade] = [dup, false]
          }
          isUpgrade
            ? result.wEngines.upgraded.push(wEngine)
            : result.wEngines.unchanged.push(wEngine)
          idsToRemove.delete(match.id)

          //Imported wEngine will be set to `importId` later, so remove the dup/upgrade now to avoid a duplicate
          super.remove(match.id, false) // Do not notify, since this is a "replacement". Also use super to bypass the equipment check
          if (!importId) importId = match.id // always resolve some id
          importWEngine = {
            ...wEngine,
            location: hasEquipment ? wEngine.location : match.location,
          }
        }
      }
      if (importId) {
        if (this.get(importId)) {
          // `importid` already in use, get a new id
          const newId = this.generateKey(takenIds)
          takenIds.add(newId)
          if (this.changeId(importId, newId)) {
            // Sync the id in `idsToRemove` due to the `changeId`
            if (idsToRemove.has(importId)) {
              idsToRemove.delete(importId)
              idsToRemove.add(newId)
            }
          }
        }
        this.set(importId, importWEngine, !foundDupOrUpgrade)
      } else {
        importId = this.generateKey(takenIds)
        takenIds.add(importId)
      }
      this.set(importId, importWEngine, !foundDupOrUpgrade)
    })

    // Shouldn't remove Somnia's signature
    const idtoRemoveArr = Array.from(idsToRemove)
    if (result.keepNotInImport || result.ignoreDups)
      result.wEngines.notInImport = idtoRemoveArr.length
    else idtoRemoveArr.forEach((k) => this.remove(k))
  }

  findDups(
    wEngine: IWEngine,
    idList = this.keys
  ): { duplicated: ICachedWEngine[]; upgraded: ICachedWEngine[] } {
    const { key, level, promotion, upgrade } = wEngine

    const wEngines = idList
      .map((id) => this.get(id))
      .filter((a) => a) as ICachedWEngine[]
    const candidates = wEngines.filter(
      (candidate) =>
        key === candidate.key &&
        level >= candidate.level &&
        promotion >= candidate.promotion &&
        upgrade >= candidate.upgrade
    )

    // Strictly upgraded wEngines
    const upgraded = candidates
      .filter(
        (candidate) =>
          level > candidate.level ||
          promotion > candidate.promotion ||
          upgrade > candidate.upgrade
      )
      .sort((candidates) =>
        candidates.location === wEngine.location ? -1 : 1
      )
    // Strictly duplicated wEngines
    const duplicated = candidates
      .filter(
        (candidate) =>
          level === candidate.level &&
          promotion === candidate.promotion &&
          upgrade === candidate.upgrade
      )
      .sort((candidates) =>
        candidates.location === wEngine.location ? -1 : 1
      )
    return { duplicated, upgraded }
  }
}

export function validateWEngine(obj: unknown = {}): IWEngine | undefined {
  if (typeof obj !== 'object') return undefined
  const { key, level: rawLevel, promotion: rawPromotion } = obj as IWEngine
  let { upgrade, location, lock } = obj as IWEngine

  if (!allWEngineKeys.includes(key)) return undefined
  if (rawLevel > wEngineMaxLevel) return undefined
  const { level, promotion } = validateLevelPromotion(rawLevel, rawPromotion)
  if (typeof upgrade !== 'number' || upgrade < 1 || upgrade > 5)
    upgrade = 1
  if (!location || !agentKeys.includes(location)) location = ''
  lock = !!lock
  return { key, level, promotion, upgrade, location, lock }
}

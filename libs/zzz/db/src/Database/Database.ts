import type { DBStorage } from '@genshin-optimizer/common/database'
import { Database, SandboxStorage } from '@genshin-optimizer/common/database'
import type { IZZZObjectDescription } from '@genshin-optimizer/zzz/zzzod'
import type { IZZZoDatabase } from '../Interfaces'
import { ZZZoSource } from '../Interfaces'
import { DBMetaEntry } from './DataEntries/DBMetaEntry'
import { DisplayAgentEntry } from './DataEntries/DisplayAgentEntry'
import { DisplayWEngineEntry } from './DataEntries/DisplayWEngineEntry'
import { DisplayDriveDiscEntry } from './DataEntries/DisplayDriveDiscEntry'
import { BuildDataManager } from './DataManagers/BuildDataManager'
import { BuildTcDataManager } from './DataManagers/BuildTcDataManager'
import { AgentMetaDataManager } from './DataManagers/AgentMetaDataManager'
import { AgentDataManager } from './DataManagers/AgentDataManager'
import { WEngineDataManager } from './DataManagers/WEngineDataManager'
import { LoadoutDataManager } from './DataManagers/LoadoutDataManager'
import { OptConfigDataManager } from './DataManagers/OptConfigDataManager'
import { DriveDiscDataManager } from './DataManagers/DriveDiscDataManager'
import { TeamDataManager } from './DataManagers/TeamDataManager'
import type { ImportResult } from './exim'
import { newImportResult } from './exim'
import {
  currentDBVersion,
  migrateZZZ as migrateZZZOD,
  migrateStorage,
} from './migrate'
export class ZZZoDatabase extends Database {
  driveDiscs: DriveDiscDataManager
  agents: AgentDataManager
  buildTcs: BuildTcDataManager
  wEngines: WEngineDataManager
  optConfigs: OptConfigDataManager
  agentMeta: AgentMetaDataManager
  builds: BuildDataManager
  loadouts: LoadoutDataManager
  teams: TeamDataManager

  dbMeta: DBMetaEntry
  displayAgent: DisplayAgentEntry
  displayWEngine: DisplayWEngineEntry
  displayDriveDisc: DisplayDriveDiscEntry
  dbIndex: 1 | 2 | 3 | 4
  dbVer: number

  keyPrefix = 'zzzo'

  constructor(dbIndex: 1 | 2 | 3 | 4, storage: DBStorage) {
    super(storage)
    migrateStorage(storage)
    // Transfer non DataManager/DataEntry data from storage
    this.dbIndex = dbIndex
    this.dbVer = storage.getDBVersion()
    this.storage.setDBVersion(this.dbVer)
    this.storage.setDBIndex(this.dbIndex)

    // Handle Datamanagers
    this.agents = new AgentDataManager(this)

    // Light cones needs to be instantiated after agent to check for relations
    this.wEngines = new WEngineDataManager(this)

    // DriveDiscs needs to be instantiated after agent to check for relations
    this.driveDiscs = new DriveDiscDataManager(this)

    // Depends on driveDiscs
    this.optConfigs = new OptConfigDataManager(this)

    this.buildTcs = new BuildTcDataManager(this)
    this.agentMeta = new AgentMetaDataManager(this)

    this.builds = new BuildDataManager(this)

    // Depends on builds, buildTcs, and optConfigs
    this.loadouts = new LoadoutDataManager(this)

    // Depends on Loadout
    this.teams = new TeamDataManager(this)

    // Handle DataEntries
    this.dbMeta = new DBMetaEntry(this)
    this.displayAgent = new DisplayAgentEntry(this)
    this.displayWEngine = new DisplayWEngineEntry(this)
    this.displayDriveDisc = new DisplayDriveDiscEntry(this)

    this.agents.followAny(() => {
      this.dbMeta.set({ lastEdit: Date.now() })
    })
    this.driveDiscs.followAny(() => {
      this.dbMeta.set({ lastEdit: Date.now() })
    })
    this.wEngines.followAny(() => {
      this.dbMeta.set({ lastEdit: Date.now() })
    })
  }
  get dataManagers() {
    // IMPORTANT: it must be agents, light cones, driveDiscs in order, to respect import order
    return [
      this.agents,
      this.wEngines,
      this.driveDiscs,
      this.optConfigs,
      this.buildTcs,
      this.agentMeta,
      this.builds,
      this.loadouts,
      this.teams,
    ] as const
  }
  get dataEntries() {
    return [
      this.dbMeta,
      this.displayAgent,
      this.displayWEngine,
      this.displayDriveDisc,
    ] as const
  }

  clear() {
    this.dataManagers.map((dm) => dm.clear())
    this.dataEntries.map((de) => de.clear())
  }
  exportZZZOD() {
    const zzzod: Partial<IZZZoDatabase & IZZZObjectDescription> = {
      format: 'ZZZOD',
      dbVersion: currentDBVersion,
      source: ZZZoSource,
      version: 1,
    }
    this.dataManagers.map((dm) => dm.exportZZZOD(zzzod))
    this.dataEntries.map((de) => de.exportZZZOD(zzzod))
    return zzzod as IZZZoDatabase & IZZZObjectDescription
  }
  importZZZOD(
    zzzod: IZZZObjectDescription & IZZZoDatabase,
    keepNotInImport: boolean,
    ignoreDups: boolean
  ): ImportResult {
    zzzod = migrateZZZOD(zzzod)
    const source = zzzod.source ?? 'Unknown'
    // Some Scanners might carry their own id field, which would conflict with GO dup resolution.
    if (source !== ZZZoSource) {
      zzzod.driveDiscs?.forEach((a) => delete (a as unknown as { id?: string }).id)
      zzzod.wEngines?.forEach(
        (a) => delete (a as unknown as { id?: string }).id
      )
    }
    const result: ImportResult = newImportResult(
      source,
      keepNotInImport,
      ignoreDups
    )

    // Follow updates from agent/driveDisc/wEngine to gather import results
    const unfollows = [
      this.agents.followAny((key, reason, value) => {
        const arr = result.agents[reason]
        const ind = arr.findIndex((c) => c?.key === key)
        if (ind < 0) arr.push(value)
        else arr[ind] = value
      }),
      this.driveDiscs.followAny((_key, reason, value) =>
        result.drivediscs[reason].push(value)
      ),
      this.wEngines.followAny((_key, reason, value) =>
        result.wEngines[reason].push(value)
      ),
    ]

    this.dataManagers.map((dm) => dm.importZZZOD(zzzod, result))
    this.dataEntries.map((de) => de.importZZZOD(zzzod, result))
    unfollows.forEach((f) => f())

    return result
  }
  clearStorage() {
    this.dataManagers.map((dm) => dm.clearStorage())
    this.dataEntries.map((de) => de.clearStorage())
  }
  saveStorage() {
    this.dataManagers.map((dm) => dm.saveStorage())
    this.dataEntries.map((de) => de.saveStorage())
    this.storage.setDBVersion(this.dbVer)
    this.storage.setDBIndex(this.dbIndex)
  }
  swapStorage(other: ZZZoDatabase) {
    this.clearStorage()
    other.clearStorage()

    const thisStorage = this.storage
    this.storage = other.storage
    other.storage = thisStorage

    this.saveStorage()
    other.saveStorage()
  }
  toExtraLocalDB() {
    const key = `zzzo_extraDatabase_${this.storage.getDBIndex()}`
    const other = new SandboxStorage(undefined, 'zzzo')
    const oldstorage = this.storage
    this.storage = other
    this.saveStorage()
    this.storage = oldstorage
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(other.entries)))
  }
}

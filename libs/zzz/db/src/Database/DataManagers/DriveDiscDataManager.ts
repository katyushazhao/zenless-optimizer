import { clamp } from '@genshin-optimizer/common/util'
import type {
  DriveDiscMainStatKey,
  DriveDiscRarityKey,
  DriveDiscSubStatKey,
} from '@genshin-optimizer/zzz/consts'
import {
  agentKeys,
  allDriveDiscMainStatKeys,
  allDriveDiscRarityKeys,
  allDriveDiscSeriesKeys,
  allDriveDiscPartitionKeys,
  allDriveDiscSubStatKeys,
  driveDiscMaxLevel,
  driveDiscPartitionToMainStatKeys,
} from '@genshin-optimizer/zzz/consts'
import type {
  IDriveDisc,
  IZZZObjectDescription,
  ISubStat,
} from '@genshin-optimizer/zzz/zzzod'
import {
  getDriveDiscMainStatVal,
  getSubStatRange,
} from '@genshin-optimizer/zzz/util'
import type {
  ICachedDriveDisc,
  ICachedSubStat,
  IZZZoDatabase,
} from '../../Interfaces'
import { DataManager } from '../DataManager'
import type { ZZZoDatabase } from '../Database'
import type { ImportResult } from '../exim'

export class DriveDiscDataManager extends DataManager<
  string,
  'driveDiscs',
  ICachedDriveDisc,
  IDriveDisc
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'driveDiscs')
  }
  override validate(obj: unknown): IDriveDisc | undefined {
    return validateDriveDisc(obj)
  }
  override toCache(storageObj: IDriveDisc, id: string): ICachedDriveDisc | undefined {
    // Generate cache fields
    const newDriveDisc = cachedDriveDisc(storageObj, id).driveDisc

    // Check relations and update equipment
    const oldDriveDisc = super.get(id)
    if (newDriveDisc.location !== oldDriveDisc?.location) {
      const partition = newDriveDisc.partition
      const prevAgent = oldDriveDisc?.location
        ? this.database.agents.getOrCreate(oldDriveDisc.location)
        : undefined
      const newAgent = newDriveDisc.location
        ? this.database.agents.getOrCreate(newDriveDisc.location)
        : undefined

      // previously equipped driveDisc at new location
      const prevDriveDisc = super.get(newAgent?.equippedDriveDiscs[partition])

      //current prevDriveDisc <-> newAgent  && newDriveDisc <-> prevAgent
      //swap to prevDriveDisc <-> prevAgent && newDriveDisc <-> newAgent(outside of this if)

      if (prevDriveDisc)
        super.setCached(prevDriveDisc.id, {
          ...prevDriveDisc,
          location: prevAgent?.key ?? '',
        })
      if (newAgent)
        this.database.agents.setEquippedDriveDisc(newAgent.key, partition, newDriveDisc.id)
      if (prevAgent)
        this.database.agents.setEquippedDriveDisc(
          prevAgent.key,
          partition,
          prevDriveDisc?.id ?? ''
        )
    } else
      newDriveDisc.location &&
        this.database.agents.triggerAgent(newDriveDisc.location, 'update')
    return newDriveDisc
  }
  override deCache(driveDisc: ICachedDriveDisc): IDriveDisc {
    const {
      series,
      rarity,
      level,
      partition,
      mainStat,
      subStats,
      location,
      locked,
    } = driveDisc
    return {
      series,
      rarity,
      level,
      partition,
      mainStat,
      subStats: subStats.map((substat) => ({
        key: substat.key,
        value: substat.value,
      })),
      location,
      locked,
    }
  }

  new(value: IDriveDisc): string {
    const id = this.generateKey()
    this.set(id, value)
    return id
  }
  override remove(key: string, notify = true): ICachedDriveDisc | undefined {
    const driveDisc = super.remove(key, notify)
    if (driveDisc)
      driveDisc.location &&
        this.database.agents.setEquippedDriveDisc(driveDisc.location, driveDisc.partition, '')
    return driveDisc
  }
  override importZZZOD(
    zzzod: IZZZObjectDescription & IZZZoDatabase,
    result: ImportResult
  ) {
    result.drivediscs.beforeMerge = this.values.length

    // Match driveDiscs for counter, metadata, and locations
    const driveDiscs = zzzod.driveDiscs

    if (!Array.isArray(driveDiscs) || !driveDiscs.length) {
      result.drivediscs.notInImport = this.values.length
      return
    }

    const takenIds = new Set(this.keys)
    driveDiscs.forEach((r) => {
      const id = (r as ICachedDriveDisc).id
      if (!id) return
      takenIds.add(id)
    })

    result.drivediscs.import = driveDiscs.length
    const idsToRemove = new Set(this.values.map((r) => r.id))
    const hasEquipment = driveDiscs.some((r) => r.location)
    driveDiscs.forEach((r): void => {
      const driveDisc = this.validate(r)
      if (!driveDisc) {
        result.drivediscs.invalid.push(r)
        return
      }

      let importDriveDisc = driveDisc
      let importId: string | undefined = (r as ICachedDriveDisc).id
      let foundDupOrUpgrade = false
      if (!result.ignoreDups) {
        const { duplicated, upgraded } = this.findDups(
          driveDisc,
          Array.from(idsToRemove)
        )
        if (duplicated[0] || upgraded[0]) {
          foundDupOrUpgrade = true
          // Favor upgrades with the same location, else use 1st dupe
          let [match, isUpgrade] =
            hasEquipment &&
            driveDisc.location &&
            upgraded[0]?.location === driveDisc.location
              ? [upgraded[0], true]
              : duplicated[0]
              ? [duplicated[0], false]
              : [upgraded[0], true]
          if (importId) {
            // favor exact id matches
            const up = upgraded.find((a) => a.id === importId)
            if (up) [match, isUpgrade] = [up, true]
            const dup = duplicated.find((a) => a.id === importId)
            if (dup) [match, isUpgrade] = [dup, false]
          }
          isUpgrade
            ? result.drivediscs.upgraded.push(driveDisc)
            : result.drivediscs.unchanged.push(driveDisc)
          idsToRemove.delete(match.id)

          //Imported driveDisc will be set to `importId` later, so remove the dup/upgrade now to avoid a duplicate
          this.remove(match.id, false) // Do not notify, since this is a "replacement"
          if (!importId) importId = match.id // always resolve some id
          importDriveDisc = {
            ...driveDisc,
            location: hasEquipment ? driveDisc.location : match.location,
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
      } else {
        importId = this.generateKey(takenIds)
        takenIds.add(importId)
      }
      this.set(importId, importDriveDisc, !foundDupOrUpgrade)
    })
    const idtoRemoveArr = Array.from(idsToRemove)
    if (result.keepNotInImport || result.ignoreDups)
      result.drivediscs.notInImport = idtoRemoveArr.length
    else idtoRemoveArr.forEach((k) => this.remove(k))
  }
  findDups(
    editorDriveDisc: IDriveDisc,
    idList = this.keys
  ): { duplicated: ICachedDriveDisc[]; upgraded: ICachedDriveDisc[] } {
    const { series, rarity, level, partition, mainStat, subStats } =
      editorDriveDisc

    const driveDiscs = idList
      .map((id) => this.get(id))
      .filter((r) => r) as ICachedDriveDisc[]
    const candidates = driveDiscs.filter(
      (candidate) =>
        series === candidate.series &&
        rarity === candidate.rarity &&
        partition === candidate.partition &&
        mainStat === candidate.mainStat &&
        level >= candidate.level &&
        subStats.every(
          (substat, i) =>
            !candidate.subStats[i].key || // Candidate doesn't have anything on this Partition
            (substat.key === candidate.subStats[i].key && // Or editor simply has better substat
              substat.value >= candidate.subStats[i].value)
        )
    )

    // Strictly upgraded driveDisc
    const upgraded = candidates
      .filter(
        (candidate) =>
          level > candidate.level &&
          (Math.floor(level / 3) === Math.floor(candidate.level / 3) // Check for extra rolls
            ? subStats.every(
                (
                  substat,
                  i // Has no extra roll
                ) =>
                  substat.key === candidate.subStats[i].key &&
                  substat.value === candidate.subStats[i].value
              )
            : subStats.some(
                (
                  substat,
                  i // Has extra rolls
                ) =>
                  candidate.subStats[i].key
                    ? substat.value > candidate.subStats[i].value // Extra roll to existing substat
                    : substat.key // Extra roll to new substat
              ))
      )
      .sort((candidates) =>
        candidates.location === editorDriveDisc.location ? -1 : 1
      )
    // Strictly duplicated driveDisc
    const duplicated = candidates
      .filter(
        (candidate) =>
          level === candidate.level &&
          subStats.every(
            (substat) =>
              !substat.key || // Empty Partition
              candidate.subStats.some(
                (candidateSubStat) =>
                  substat.key === candidateSubStat.key && // Or same Partition
                  substat.value === candidateSubStat.value
              )
          )
      )
      .sort((candidates) =>
        candidates.location === editorDriveDisc.location ? -1 : 1
      )
    return { duplicated, upgraded }
  }
}

export function cachedDriveDisc(
  flex: IDriveDisc,
  id: string
): { driveDisc: ICachedDriveDisc; errors: string[] } {
  const { location, locked, series, partition, rarity, mainStat } = flex
  const level = Math.round(
    Math.min(Math.max(0, flex.level), driveDiscMaxLevel[rarity])
  )
  const mainStatVal = getDriveDiscMainStatVal(rarity, mainStat, level)

  const errors: string[] = []
  const subStats: ICachedSubStat[] = flex.subStats.map((substat) => ({
    ...substat,
    rolls: [],
    efficiency: 0,
    accurateValue: substat.value,
  }))

  const validated: ICachedDriveDisc = {
    id,
    series,
    location,
    partition,
    locked,
    mainStat,
    rarity,
    level,
    subStats,
    mainStatVal,
  }

  // TODO: Validate rolls
  // const allPossibleRolls: { index: number; substatRolls: number[][] }[] = []
  // let totalUnambiguouzZZolls = 0

  // function efficiency(value: number, key: DriveDiscSubStatKey): number {
  //   return (value / getSubStatValue(rarity, key, 'high')) * 100
  // }

  // subStats.forEach((substat, _index): void => {
  //   const { key, value } = substat
  //   if (!key) {
  //     substat.value = 0
  //     return
  //   }
  //   substat.efficiency = efficiency(value, key)

  //   const possibleRolls = getSubStatRolls(key, value, rarity)

  //   if (possibleRolls.length) {
  //     // Valid SubStat
  //     const possibleLengths = new Set(possibleRolls.map((roll) => roll.length))

  //     if (possibleLengths.size !== 1) {
  //       // Ambiguous Rolls
  //       allPossibleRolls.push({ index, substatRolls: possibleRolls })
  //     } else {
  //       // Unambiguous Rolls
  //       totalUnambiguouzZZolls += possibleRolls[0].length
  //     }

  //     substat.rolls = possibleRolls.reduce((best, current) =>
  //       best.length < current.length ? best : current
  //     )
  //     substat.efficiency = efficiency(
  //       substat.rolls.reduce((a, b) => a + b, 0),
  //       key
  //     )
  //     substat.accurateValue = substat.rolls.reduce((a, b) => a + b, 0)
  //   } else {
  //     // Invalid SubStat
  //     substat.rolls = []
  //     // TODO: Translate
  //     errors.push(`Invalid substat ${substat.key}`)
  //   }
  // })

  // if (errors.length) return { driveDisc: validated, errors }

  // const { low, high } = driveDiscSubStatRollData[rarity],
  //   lowerBound = low + Math.floor(level / 3),
  //   upperBound = high + Math.floor(level / 3)

  // let highestScore = -Infinity // -Max(subStats.rolls[i].length) over ambiguous rolls
  // const tryAllSubStats = (
  //   rolls: { index: number; roll: number[] }[],
  //   currentScore: number,
  //   total: number
  // ) => {
  //   if (rolls.length === allPossibleRolls.length) {
  //     if (
  //       total <= upperBound &&
  //       total >= lowerBound &&
  //       highestScore < currentScore
  //     ) {
  //       highestScore = currentScore
  //       for (const { index, roll } of rolls) {
  //         const key = subStats[index].key as DriveDiscSubStatKey
  //         const accurateValue = roll.reduce((a, b) => a + b, 0)
  //         subStats[index].rolls = roll
  //         subStats[index].accurateValue = accurateValue
  //         subStats[index].efficiency = efficiency(accurateValue, key)
  //       }
  //     }

  //     return
  //   }

  //   const { index, substatRolls } = allPossibleRolls[rolls.length]
  //   for (const roll of substatRolls) {
  //     rolls.push({ index, roll })
  //     const newScore = Math.min(currentScore, -roll.length)
  //     if (newScore >= highestScore)
  //       // Scores won't get better, so we can skip.
  //       tryAllSubStats(rolls, newScore, total + roll.length)
  //     rolls.pop()
  //   }
  // }

  // tryAllSubStats([], Infinity, totalUnambiguouzZZolls)

  // const totalRolls = subStats.reduce(
  //   (accu, { rolls }) => accu + rolls.length,
  //   0
  // )

  // if (totalRolls > upperBound)
  //   errors.push(
  //     `${rarity}-star driveDisc (level ${level}) should have no more than ${upperBound} rolls. It currently has ${totalRolls} rolls.`
  //   )
  // else if (totalRolls < lowerBound)
  //   errors.push(
  //     `${rarity}-star driveDisc (level ${level}) should have at least ${lowerBound} rolls. It currently has ${totalRolls} rolls.`
  //   )

  // if (subStats.some((substat) => !substat.key)) {
  //   const substat = subStats.find((substat) => (substat.rolls?.length ?? 0) > 1)
  //   if (substat)
  //     // TODO: Translate
  //     errors.push(
  //       `SubStat ${substat.key} has > 1 roll, but not all subStats are unlockeded.`
  //     )
  // }

  return { driveDisc: validated, errors }
}

export function validateDriveDisc(
  obj: unknown = {},
  allowZeroSub = false
): IDriveDisc | undefined {
  if (!obj || typeof obj !== 'object') return undefined
  const { series, rarity, partition } = obj as IDriveDisc
  let { level, mainStat, subStats, location, locked } = obj as IDriveDisc

  if (
    !allDriveDiscSeriesKeys.includes(series) ||
    !allDriveDiscPartitionKeys.includes(partition) ||
    !allDriveDiscMainStatKeys.includes(mainStat) ||
    !allDriveDiscRarityKeys.includes(rarity) ||
    typeof level !== 'number' ||
    level < 0 ||
    level > 15
  )
    return undefined // non-recoverable
  level = Math.round(level)
  if (level > driveDiscMaxLevel[rarity]) return undefined

  subStats = parseSubStats(subStats, rarity, allowZeroSub)
  // substat cannot have same key as mainstat
  if (subStats.find((sub) => sub.key === mainStat)) return undefined
  locked = !!locked
  const plausibleMainStats = driveDiscPartitionToMainStatKeys[partition]
  if (!(plausibleMainStats as DriveDiscMainStatKey[]).includes(mainStat))
    if (plausibleMainStats.length === 1) mainStat = plausibleMainStats[0]
    else return undefined // ambiguous mainstat
  if (!location || !agentKeys.includes(location)) location = ''
  return {
    series,
    rarity,
    level,
    partition,
    mainStat,
    subStats,
    location,
    locked,
  }
}
function defSub(): ISubStat {
  return { key: '', value: 0 }
}
function parseSubStats(
  obj: unknown,
  rarity: DriveDiscRarityKey,
  allowZeroSub = false
): ISubStat[] {
  if (!Array.isArray(obj)) return new Array(4).map((_) => defSub())
  const subStats = (obj as ISubStat[])
    .slice(0, 4)
    .map(({ key = '', value = 0 }) => {
      if (
        !allDriveDiscSubStatKeys.includes(key as DriveDiscSubStatKey) ||
        typeof value !== 'number' ||
        !isFinite(value)
      )
        return defSub()
      if (key) {
        value = key.endsWith('_')
          ? Math.round(value * 1000) / 1000
          : Math.round(value)
        const { low, high } = getSubStatRange(rarity, key)
        value = clamp(value, allowZeroSub ? 0 : low, high)
      } else value = 0
      return { key, value }
    })
  while (subStats.length < 4) subStats.push(defSub())

  return subStats
}

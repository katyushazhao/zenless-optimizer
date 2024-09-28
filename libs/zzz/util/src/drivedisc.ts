import {
  getRandomElementFromArray,
  getRandomIntInclusive,
  getUnitStr,
  range,
  toPercent,
} from '@genshin-optimizer/common/util'
import type { DriveDiscPartitionKey } from '@genshin-optimizer/zzz/consts'
import {
  allDriveDiscPartitionKeys,
  allDriveDiscSeriesKeys,
  allDriveDiscRarityKeys,
  allDriveDiscSubStatKeys,
  driveDiscMaxLevel,
  driveDiscPartitionToMainStatKeys,
  driveDiscSubstatRollData,
  type DriveDiscMainStatKey,
  type DriveDiscRarityKey,
  type DriveDiscSubStatKey,
} from '@genshin-optimizer/zzz/consts'
import type { IDriveDisc, ISubStat } from '@genshin-optimizer/zzz/zzzod'
// import { allStats } from '@genshin-optimizer/zzz/stats' // TODO: Update this import once zzz/stats is available

export function getDriveDiscMainStatVal(
  rarity: DriveDiscRarityKey,
  statKey: DriveDiscMainStatKey,
  level: number
) {
  // const { base, add } = allStats.driveDisc.main[rarity][statKey] ?? {} // TODO: Update this once zzz/stats is available
  const base = 0 // TODO: Remove this placeholder once zzz/stats is available
  const add = 0 // TODO: Remove this placeholder once zzz/stats is available
  if (base === undefined || add === undefined)
    throw new Error(
      `Attempted to get driveDisc main stat value that doesn't exist for a level ${level} ${rarity}-star, ${statKey} driveDisc.`
    )
  return base + add * level
}

export function getDriveDiscMainStatDisplayVal(
  rarity: DriveDiscRarityKey,
  statKey: DriveDiscMainStatKey,
  level: number
) {
  return roundStat(
    toPercent(getDriveDiscMainStatVal(rarity, statKey, level), statKey),
    statKey
  )
}

// TODO: Update this with proper corrected rolls
export function getSubstatValue(
  rarity: DriveDiscRarityKey,
  statKey: DriveDiscSubStatKey,
  type: 'low' | 'med' | 'high' = 'high',
  round = true
) {
  // const { base, step } = allStats.driveDisc.sub[rarity][statKey] ?? {} // TODO: Update this once zzz/stats is available
  const base = 0 // TODO: Remove this placeholder once zzz/stats is available
  const step = 0 // TODO: Remove this placeholder once zzz/stats is available
  if (base === undefined || step === undefined)
    throw new Error(
      `Attempted to get driveDisc sub stat value that doesn't exist for a ${rarity}-star driveDisc with subStat ${statKey}.`
    )
  const steps = type === 'low' ? 0 : type === 'med' ? 1 : 2
  const value = base + steps * step
  return round ? roundStat(value, statKey) : value
}

// TODO: Update this with proper corrected rolls
export function getSubstatRange(
  rarity: DriveDiscRarityKey,
  statKey: DriveDiscSubStatKey,
  round = true
) {
  const { numUpgrades } = driveDiscSubstatRollData[rarity]
  const high =
    getSubstatValue(rarity, statKey, 'high', false) * (numUpgrades + 1)
  return {
    low: getSubstatValue(rarity, statKey, 'low', round),
    high: round ? roundStat(high, statKey) : high,
  }
}

export function randomizeDriveDisc(base: Partial<IDriveDisc> = {}): IDriveDisc {
  const series = base.series ?? getRandomElementFromArray(allDriveDiscSeriesKeys)

  const rarity = base.rarity ?? getRandomElementFromArray(allDriveDiscRarityKeys)
  const partition: DriveDiscPartitionKey =
    base.partition ??
    getRandomElementFromArray(
      [...(allDriveDiscSeriesKeys as readonly string[])].includes(series)
        ? allDriveDiscPartitionKeys
        : allDriveDiscPartitionKeys
    )
  const mainStat: DriveDiscMainStatKey =
    base.mainStat ?? getRandomElementFromArray(driveDiscPartitionToMainStatKeys[partition])
  const level = base.level ?? getRandomIntInclusive(0, driveDiscMaxLevel[rarity])
  const subStats: ISubStat[] = [0, 1, 2, 3].map(() => ({ key: '', value: 0 }))

  const { low, high } = driveDiscSubstatRollData[rarity]
  const totRolls = Math.floor(level / 3) + getRandomIntInclusive(low, high)
  const numOfInitialSubstats = Math.min(totRolls, 4)
  const numUpgradesOrUnlocks = totRolls - numOfInitialSubstats

  // const RollStat = (subStat: DriveDiscSubStatKey): number =>
  //   allStats.driveDisc.sub[rarity][subStat].base + // TODO: Update this once zzz/stats is available
  //   getRandomElementFromArray(range(0, 2)) *
  //     allStats.driveDisc.sub[rarity][subStat].step // TODO: Update this once zzz/stats is available

  let remainingSubstats = allDriveDiscSubStatKeys.filter(
    (key) => mainStat !== key
  )
  for (const subStat of subStats.slice(0, numOfInitialSubstats)) {
    subStat.key = getRandomElementFromArray(remainingSubstats)
    // subStat.value = RollStat(subStat.key as DriveDiscSubStatKey) // TODO: Update this once zzz/stats is available
    remainingSubstats = remainingSubstats.filter((key) => key !== subStat.key)
  }
  for (let i = 0; i < numUpgradesOrUnlocks; i++) {
    const subStat = getRandomElementFromArray(subStats)
    // subStat.value += RollStat(subStat.key as any) // TODO: Update this once zzz/stats is available
  }
  for (const subStat of subStats)
    if (subStat.key) {
      subStat.value = roundStat(subStat.value, subStat.key)
    }

  return {
    series,
    rarity,
    partition: partition,
    mainStat,
    level,
    subStats,
    location: base.location ?? '',
    locked: false,
  }
}

export function roundStat(
  value: number,
  statKey: DriveDiscMainStatKey | DriveDiscSubStatKey
) {
  return getUnitStr(statKey) === '%'
    ? Math.round(value * 10000) / 10000
    : Math.round(value * 100) / 100
}

// TODO: implement when roll table is added
export function getSubstatSummedRolls(
  rarity: DriveDiscRarityKey,
  key: DriveDiscSubStatKey
): number[] {
  // for now, return min and max range
  return Object.values(getSubstatRange(rarity, key, false)).map((v) =>
    toPercent(v, key)
  )
}

// TODO: implement when roll table is added
export function getSubstatValuesPercent(
  subStatKey: DriveDiscSubStatKey,
  rarity: DriveDiscRarityKey
) {
  console.log('getSubstatValuesPercent', subStatKey, rarity)
  return []
}

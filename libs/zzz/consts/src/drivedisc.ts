export const allDriveDiscPartitionKeys = [1, 2, 3, 4, 5, 6] as const
export type DriveDiscPartitionKey = (typeof allDriveDiscPartitionKeys)[number]

export const allDriveDiscSeriesKeys = [
  'ChaoticMetal',
  'FangedMetal',
  'FreedomBlues',
  'HormonePunk',
  'InfernoMetal',
  'PolarMetal',
  'PufferElectro',
  'ShockstarDisco',
  'SoulRock',
  'SwingJazz',
  'ThunderMetal',
  'WoodpeckerElectro',
] as const
export type DriveDiscSeriesKey = (typeof allDriveDiscSeriesKeys)[number]

export const allDriveDiscSubStatKeys = [
  'hp',
  'atk',
  'def',
  'hp_',
  'atk_',
  'def_',
  'pen',
  'crit_',
  'crit_dmg_',
  'anomaly_proficiency',
] as const
export type DriveDiscSubStatKey = (typeof allDriveDiscSubStatKeys)[number]

export const allDriveDiscMainStatKeys = [
  'hp',
  'atk',
  'def',
  'hp_',
  'atk_',
  'def_',
  'crit_',
  'crit_dmg_',
  'enerRegen_',
  'physical_dmg_',
  'fire_dmg_',
  'ice_dmg_',
  'electric_dmg_',
  'ether_dmg_',
  'impact',
  'pen_ratio_',
  'anomaly_proficiency',
  'anomaly_mastery',
] as const
export type DriveDiscMainStatKey = (typeof allDriveDiscMainStatKeys)[number]

export const allDriveDiscRarityKeys = ['S', 'A', 'B'] as const
export type DriveDiscRarityKey = (typeof allDriveDiscRarityKeys)[number]

export const allDriveDiscSeriesCountKeys = [2, 4] as const
export type DriveDiscSeriesCountKey = (typeof allDriveDiscSeriesCountKeys)[number]

export const driveDiscMaxLevel: Record<DriveDiscRarityKey, number> = {
  S: 15,
  A: 12,
  B: 9,
} as const

export const driveDiscSubstatRollData: Record<
  DriveDiscRarityKey,
  { low: number; high: number; numUpgrades: number }
> = {
  S: { low: 3, high: 4, numUpgrades: 5 },
  A: { low: 2, high: 3, numUpgrades: 4 },
  B: { low: 1, high: 2, numUpgrades: 3 },
} as const

export const driveDiscPartitionToMainStatKeys: Record<DriveDiscPartitionKey, DriveDiscMainStatKey[]> =
  {
    1: ['hp'],
    2: ['atk'],
    3: ['def'],
    4: ['hp_', 'atk_', 'def_', 'crit_', 'crit_dmg_', 'anomaly_proficiency'],
    5: ['hp_', 'atk_', 'def_', 'pen_ratio_', 'physical_dmg_', 'fire_dmg_', 'ice_dmg_', 'electric_dmg_', 'ether_dmg_'],
    6: ['hp_', 'atk_', 'def_', 'anomaly_mastery', 'impact', 'enerRegen_'],
  }

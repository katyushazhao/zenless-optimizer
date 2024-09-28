import type { SkillKey } from './agent'

export const allRarityKeys = ['S', 'A', 'B'] as const
export type RarityKey = (typeof allRarityKeys)[number]

export const allStatKeys = [
  'hp',
  'hp_',
  'atk',
  'atk_',
  'def',
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
  'pen',
  'anomaly_proficiency',
  'anomaly_mastery',
] as const
export type StatKey = (typeof allStatKeys)[number]

export const allAnomalyDamageKeys = [
  'physical_dmg_',
  'fire_dmg_',
  'ice_dmg_',
  'electric_dmg_',
  'ether_dmg_',
] as const
export type AnomalyDamageKey = (typeof allAnomalyDamageKeys)[number]

export const allPromotionKeys = [0, 1, 2, 3, 4, 5] as const
export type PromotionKey = (typeof allPromotionKeys)[number]

export const skillLimits = [1, 3, 5, 7, 9, 12] as const
export const coreSkillLimits = [1, 2, 3, 4, 5, 7] as const
export const allSkillLimits: Record<
  SkillKey,
  typeof skillLimits | typeof coreSkillLimits
> = {
  basic: skillLimits,
  dodge: skillLimits,
  assist: skillLimits,
  special: skillLimits,
  chain: skillLimits,
  core: coreSkillLimits,
} as const

export const allSpecialtyKeys = [
  'attack',
  'stun',
  'anomaly',
  'support',
  'defence',
] as const
export type SpecialtyKey = (typeof allSpecialtyKeys)[number]

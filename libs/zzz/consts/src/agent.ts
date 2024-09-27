export const agentKeys = [
  'AlexandrinaSebastiane',
  'AnbyDemara',
  'AntonIvanov',
  'BenBigger',
  'BillyKid',
  'CaesarKing',
  'CorinWickes',
  'EllenJoe',
  'GraceHoward',
  'HoshimiMiyabi',
  'JaneDoe',
  'KoledaBelobog',
  'LucianaDeMontefio',
  'NekomiyaMana',
  'NicoleDemara',
  'PiperWheel',
  'Qingyi',
  'SethLowell',
  'Soldier11',
  'Soukaku',
  'VonLycaon',
  'ZhuYuan',
] as const
export type AgentKey = (typeof agentKeys)[number]

export const allAnomalyTypeKeys = [
  'electric',
  'ether',
  'fire',
  'ice',
  'physical',
] as const
export type AnomalyTypeKey = (typeof allAnomalyTypeKeys)[number]

export const maxMindscapeCount = 6 as const

export const allLocationKeys = [...agentKeys, ''] as const
export type LocationKey = (typeof allLocationKeys)[number]

export const allCoreSkillKeys = [1, 2, 3, 4, 5, 7] as const
export type CoreSkillKey = (typeof allCoreSkillKeys)[number]

export const allMindscapeKeys = [0, 1, 2, 3, 4, 5, 6] as const
export type MindscapeKey = (typeof allMindscapeKeys)[number]

export const allSkillKeys = [
  'basic',
  'dodge',
  'assist',
  'special',
  'chain',
  'core',
] as const
export type SkillKey = (typeof allSkillKeys)[number]

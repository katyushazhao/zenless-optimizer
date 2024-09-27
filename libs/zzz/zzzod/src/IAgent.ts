import type {
  PromotionKey,
  AgentKey,
} from '@genshin-optimizer/zzz/consts'

export interface IAgent {
  key: AgentKey
  level: number
  mindscape: number
  promotion: PromotionKey
  basic: number
  dodge: number
  assist: number
  special: number
  chain: number
  core: number
}

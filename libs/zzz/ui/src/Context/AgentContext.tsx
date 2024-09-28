import type { ICachedAgent } from '@genshin-optimizer/zzz/db'
import { createContext, useContext } from 'react'

export type AgentContextObj = {
  agent: ICachedAgent | undefined
}

export const AgentContext = createContext({} as AgentContextObj)

export function useAgentContext() {
  return useContext(AgentContext)
}

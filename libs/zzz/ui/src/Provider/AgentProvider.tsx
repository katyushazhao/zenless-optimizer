import type { AgentKey } from '@genshin-optimizer/zzz/consts'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import type { AgentContextObj } from '../Context/AgentContext'
import { AgentContext } from '../Context/AgentContext'

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agentKey, setAgentKey] = useState<AgentKey | ''>('')
  const agentContextObj: AgentContextObj = useMemo(
    () => ({ agent: undefined, agentKey, setAgentKey }),
    [agentKey]
  )

  return (
    <AgentContext.Provider value={agentContextObj}>
      {children}
    </AgentContext.Provider>
  )
}

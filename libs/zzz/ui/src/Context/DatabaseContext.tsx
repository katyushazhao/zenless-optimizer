import type { ZZZoDatabase } from '@genshin-optimizer/zzz/db'
import { createContext, useContext } from 'react'

export type DatabaseContextObj = {
  databases: ZZZoDatabase[]
  setDatabase: (index: number, db: ZZZoDatabase) => void
  database: ZZZoDatabase
}

export const DatabaseContext = createContext({} as DatabaseContextObj)

export function useDatabaseContext() {
  return useContext(DatabaseContext)
}

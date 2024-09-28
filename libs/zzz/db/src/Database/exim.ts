import type { IWEngine, IDriveDisc } from '@genshin-optimizer/zzz/zzzod'
import type { ICachedAgent } from '../Interfaces'

function newCounter<T>(): ImportResultCounter<T> {
  return {
    import: 0,
    invalid: [],
    new: [],
    update: [],
    unchanged: [],
    upgraded: [],
    remove: [],
    notInImport: 0,
    beforeMerge: 0,
  }
}

export function newImportResult(
  source: string,
  keepNotInImport: boolean,
  ignoreDups: boolean
): ImportResult {
  return {
    type: 'ZZZ',
    source,
    drivediscs: newCounter(),
    wEngines: newCounter(),
    agents: newCounter(),
    keepNotInImport,
    ignoreDups,
  }
}

export type ImportResultCounter<T> = {
  import: number // total # in file
  new: T[]
  update: T[] // Use new object
  unchanged: T[] // Use new object
  upgraded: T[]
  remove: T[]
  invalid: T[]
  notInImport: number
  beforeMerge: number
}
export type ImportResult = {
  type: 'ZZZ'
  source: string
  drivediscs: ImportResultCounter<IDriveDisc>
  wEngines: ImportResultCounter<IWEngine>
  agents: ImportResultCounter<ICachedAgent>
  keepNotInImport: boolean
  ignoreDups: boolean
}

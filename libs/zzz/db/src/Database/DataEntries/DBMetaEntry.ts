import type { Database } from '@genshin-optimizer/common/database'
import type { IZZZObjectDescription } from '@genshin-optimizer/zzz/zzzod'
import type { IZZZoDatabase } from '../../Interfaces'
import { DataEntry } from '../DataEntry'
import type { ZZZoDatabase } from '../Database'
import type { ImportResult } from '../exim'

interface IDBMeta {
  name: string
  lastEdit: number
}

function dbMetaInit(database: Database): IDBMeta {
  return {
    name: `Database ${database.storage.getDBIndex()}`,
    lastEdit: 0,
  }
}

export class DBMetaEntry extends DataEntry<
  'dbMeta',
  'dbMeta',
  IDBMeta,
  IDBMeta
> {
  constructor(database: ZZZoDatabase) {
    super(database, 'dbMeta', dbMetaInit, 'dbMeta')
  }
  override validate(obj: any): IDBMeta | undefined {
    if (typeof obj !== 'object') return undefined
    let { name, lastEdit } = obj
    if (typeof name !== 'string')
      name = `Database ${this.database.storage.getDBIndex()}`
    if (typeof lastEdit !== 'number') console.warn('lastEdit INVALID')
    if (typeof lastEdit !== 'number') lastEdit = 0

    return { name, lastEdit } as IDBMeta
  }
  override importZZZOD(
    zzzoDb: IZZZoDatabase & IZZZObjectDescription,
    _result: ImportResult
  ): void {
    const data = zzzoDb[this.prefixedKey]
    if (data) {
      // Don't copy over lastEdit data
      const { lastEdit, ...rest } = data as IDBMeta
      this.set(rest)
    }
  }
}

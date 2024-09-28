import { DataManagerBase } from '@genshin-optimizer/common/database'
import type { IZZZObjectDescription } from '@genshin-optimizer/zzz/zzzod'
import type { IZZZoDatabase, ZZZoDatabase } from '..'
import type { ImportResult } from './exim'
export class DataManager<
  CacheKey extends string,
  DataKey extends string,
  CacheValue extends StorageValue,
  StorageValue
> extends DataManagerBase<
  CacheKey,
  DataKey,
  CacheValue,
  StorageValue,
  ZZZoDatabase
> {
  constructor(database: ZZZoDatabase, dataKey: DataKey) {
    super(database, dataKey)
    // If the storage has a key for some entry AND
    // the entry doesn't exist in memory:
    // Delete it from storage
    for (const key of this.database.storage.keys)
      if (
        key.startsWith(this.goKeySingle) &&
        !this.set(this.toCacheKey(key), {})
      ) {
        this.database.storage.remove(key)
      }
  }
  exportZZZOD(zzzo: Partial<IZZZObjectDescription & IZZZoDatabase>) {
    const key = this.dataKey
    zzzo[key] = Object.entries(this.data).map(([id, value]) => ({
      ...this.deCache(value),
      id,
    }))
  }
  importZZZOD(zzzo: IZZZObjectDescription & IZZZoDatabase, _result: ImportResult) {
    const entries = zzzo[this.dataKey]
    if (entries && Array.isArray(entries))
      entries.forEach((ele) => ele.id && this.set(ele.id, ele))
  }
  override get goKeySingle() {
    const key = this.dataKey
    if (key.endsWith('s'))
      return `${this.database.keyPrefix}_${key.slice(0, -1)}`
    return `${this.database.keyPrefix}_${key}`
  }
}

import { DataEntryBase } from '@genshin-optimizer/common/database'
import type { IZZZObjectDescription } from '@genshin-optimizer/zzz/zzzod'
import type { IZZZoDatabase } from '../Interfaces'
import type { ZZZoDatabase } from './Database'
import type { ImportResult } from './exim'

export class DataEntry<
  Key extends string,
  ZZZOKey extends string,
  CacheValue,
  StorageValue
> extends DataEntryBase<Key, ZZZOKey, CacheValue, StorageValue, ZZZoDatabase> {
  get prefixedKey() {
    return `${this.database.keyPrefix}_${this.goKey}`
  }
  exportZZZOD(zzzoDb: Partial<IZZZoDatabase & IZZZObjectDescription>) {
    zzzoDb[this.prefixedKey] = this.data
  }
  importZZZOD(
    zzzoDb: IZZZObjectDescription &
      IZZZoDatabase & { [k in ZZZOKey]?: Partial<StorageValue> | never },
    _result: ImportResult
  ) {
    const data = zzzoDb[this.prefixedKey]
    if (data) this.set(data)
  }
}

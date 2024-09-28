// MIGRATION STEP
// 0. DO NOT change old `migrateVersion` calls
// 1. Add new `migrateVersion` call within `migrateZZZ` function
// 2. Add new `migrateVersion` call within `migrateStorage` function
// 3. Update `currentDBVersion`
// 4. Test on import, and also on version update

import type { DBStorage } from '@genshin-optimizer/common/database'
import type { IZZZObjectDescription } from '@genshin-optimizer/zzz/zzzod'
import type { IZZZoDatabase } from '../Interfaces'

export const currentDBVersion = 1

export function migrateZZZ(
  zzz: IZZZObjectDescription & IZZZoDatabase
): IZZZObjectDescription & IZZZoDatabase {
  const version = zzz.dbVersion ?? 0
  // function migrateVersion(version: number, cb: () => void) {
  //   const dbver = zzz.dbVersion ?? 0
  //   if (dbver < version) {
  //     cb()
  //     // Update version upon each successful migration, so we don't
  //     // need to migrate that part again if later parts fail.
  //     zzz.dbVersion = version
  //   }
  // }

  // migrateVersion(2, () => {})

  zzz.dbVersion = currentDBVersion
  if (version > currentDBVersion)
    throw new Error(`Database version ${version} is not supported`)
  return zzz
}

/**
 * Migrate parsed data in `storage` in-place to a parsed data of the latest supported DB version.
 *
 * **CAUTION**
 * Throw an error if `storage` uses unsupported DB version.
 */
export function migrateStorage(storage: DBStorage) {
  const version = storage.getDBVersion()

  // function migrateVersion(version: number, cb: () => void) {
  //   const dbver = storage.getDBVersion()
  //   if (dbver < version) {
  //     cb()
  //     // Update version upon each successful migration, so we don't
  //     // need to migrate that part again if later parts fail.
  //     storage.setDBVersion(version)
  //   }
  // }

  // migrateVersion(2, () => {})

  storage.setDBVersion(currentDBVersion)
  if (version > currentDBVersion)
    throw new Error(`Database version ${version} is not supported`)
}

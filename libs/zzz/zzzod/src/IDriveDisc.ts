import type {
  DriveDiscPartitionKey,
  DriveDiscSeriesKey,
  DriveDiscSubStatKey,
  DriveDiscMainStatKey,
  DriveDiscRarityKey,
  LocationKey,
} from '@genshin-optimizer/zzz/consts'

export interface IDriveDisc {
  partition: DriveDiscPartitionKey
  series: DriveDiscSeriesKey
  subStats: ISubStat[]
  mainStat: DriveDiscMainStatKey
  rarity: DriveDiscRarityKey
  location: LocationKey
  level: number
  locked: boolean
}

export interface ISubStat {
  key: DriveDiscSubStatKey | ''
  value: number
}

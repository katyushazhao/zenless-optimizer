import type { IDriveDisc, ISubStat } from '@genshin-optimizer/zzz/zzzod'

export interface ICachedDriveDisc extends IDriveDisc {
  id: string
  mainStatVal: number
  substats: ICachedSubStat[]
}

export interface ICachedSubStat extends ISubStat {
  rolls: number[]
  efficiency: number
  accurateValue: number
}

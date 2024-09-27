import type { IAgent } from './IAgent'
import type { IWEngine } from './IWEngine'
import type { IDriveDisc } from './IDriveDisc'

export type IZZZObjectDescription = {
  format: string
  source: string
  version: 1
  agents?: IAgent[]
  wEngines?: IWEngine[]
  driveDiscs?: IDriveDisc[]
}

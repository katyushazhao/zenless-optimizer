import { dumpFile } from '@genshin-optimizer/common/pipeline'
import type {
  AgentKey,
  WEngineKey,
  DriveDiscSeriesKey,
  DriveDiscPartitionKey,
} from '@genshin-optimizer/zzz/consts'
// import {
//   avatarConfig,
//   avatarRankConfig,
//   avatarSkillConfig,
//   avatarSkillTreeConfig,
//   agentIdMap,
//   DmAttackTypeMap,
//   equipmentConfig,
//   wEngineIdMap,
//   drivediscDataInfo,
//   driveDiscSeriesIdMap,
//   drivediscPartitionMap,
// } from '@genshin-optimizer/zzz/dm'
import type { PromiseExecutor } from '@nx/devkit'
import { workspaceRoot } from '@nx/devkit'
//import type { GenAssetsDataExecutorSchema } from './schema'

type AgentIcon = {
  icon: string
  basic: string[]
  dodge: string[]
  assist: string[]
  special: string[]
  chain: string[]
  core: string[]
  mindscape1: string
  mindscape2: string
  mindscape3: string
  mindscape4: string
  mindscape5: string
  mindscape6: string
}

type WEngineIcon = {
  icon: string
  cover: string
}

type DriveDiscIcons = Record<
  DriveDiscSeriesKey,
  Record<DriveDiscPartitionKey, string>
>
// An object to store all the asset related data.
const assetData = {
  // artifacts: {},
  wEngines: {} as Record<WEngineKey, WEngineIcon>,
  agents: {} as Record<AgentKey, AgentIcon>,
  driveDiscs: {} as DriveDiscIcons,
}
export type AssetData = typeof assetData

// const runExecutor: PromiseExecutor<GenAssetsDataExecutorSchema> = async (
//   options
// ) => {
//   console.log('Executor ran for GenAssetsData', options)

  // Get icons for each drivedisc piece
  // assetData.driveDiscs = Object.fromEntries(
  //   Object.entries(drivediscDataInfo).map(([driveDiscSeriesId, driveDiscDatas]) => [
  //     driveDiscSeriesIdMap[driveDiscSeriesId],
  //     Object.fromEntries(
  //       Object.entries(driveDiscDatas).map(([driveDiscPartitionKey, driveDiscData]) => [
  //         driveDiscPartitionKey,
  //         driveDiscData.ItemFigureIconPath,
  //       ])
  //     ),
  //   ])
  // ) as DriveDiscIcons

  // parse baseStat/ascension/basic data for agents.
  // Object.entries(avatarConfig).forEach(([avatarId, charData]) => {
  //   const { DefaultAvatarHeadIconPath, SkillList } = charData
  //   const [eidolon1, eidolon2, eidolon3, eidolon4, eidolon5, eidolon6] =
  //     Object.values(avatarRankConfig[avatarId]).map((config) => config.IconPath)

  //   const [
  //     _basic,
  //     _skill,
  //     _ult,
  //     _talent,
  //     _technique,
  //     bonusAbility1,
  //     bonusAbility2,
  //     bonusAbility3,
  //   ] = Object.values(avatarSkillTreeConfig[avatarId]).map(
  //     // Grab the first level; we just need the image names
  //     (skillTree) => skillTree[0].IconPath
  //   )

  //   const assets: AgentIcon = {
  //     icon: DefaultAvatarHeadIconPath,
  //     basic: [],
  //     skill: [],
  //     ult: [],
  //     talent: [],
  //     technique: [],
  //     overworld: [],
  //     bonusAbility1,
  //     bonusAbility2,
  //     bonusAbility3,
  //     eidolon1,
  //     eidolon2,
  //     eidolon3,
  //     eidolon4,
  //     eidolon5,
  //     eidolon6,
  //   }

  //   SkillList.forEach((skillId) => {
  //     // Grab the first level; we just need the image names
  //     const { AttackType, SkillIcon } = avatarSkillConfig[skillId][0]
  //     assets[AttackType ? DmAttackTypeMap[AttackType] : 'talent']?.push(
  //       SkillIcon
  //     )
  //   })

  //   assetData.chars[agentIdMap[avatarId]] = assets
  // })

  // Object.entries(equipmentConfig).forEach(([id, data]) => {
  //   const { ThumbnailPath, ImagePath } = data

  //   const assets: WEngineIcon = {
  //     icon: ThumbnailPath,
  //     cover: ImagePath,
  //   }
  //   assetData.wEngines[wEngineIdMap[id]] = assets
  // })

  // Dump out the asset List.
  // dumpFile(
  //   `${workspaceRoot}/libs/zzz/assets-data/src/AssetsData_gen.json`,
  //   assetData
  // )

  // return {
  //   success: true,
  // }
// }

// export default runExecutor

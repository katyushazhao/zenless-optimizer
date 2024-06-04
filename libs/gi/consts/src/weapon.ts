import type { AscensionKey } from './character'
import type { RarityKey } from './common'

export const allWeaponTypeKeys = [
  'sword',
  'claymore',
  'polearm',
  'bow',
  'catalyst',
] as const
export type WeaponTypeKey = (typeof allWeaponTypeKeys)[number]

export const allWeaponSwordKeys = [
  'Absolution',
  'AmenomaKageuchi',
  'AquilaFavonia',
  'BlackcliffLongsword',
  'CinnabarSpindle',
  'CoolSteel',
  'DarkIronSword',
  'DullBlade',
  'FavoniusSword',
  'FesteringDesire',
  'FilletBlade',
  'FinaleOfTheDeep',
  'FleuveCendreFerryman',
  'FreedomSworn',
  'HaranGeppakuFutsu',
  'HarbingerOfDawn',
  'IronSting',
  'KagotsurubeIsshin',
  'KeyOfKhajNisut',
  'LightOfFoliarIncision',
  'LionsRoar',
  'MistsplitterReforged',
  'PrimordialJadeCutter',
  'PrototypeRancour',
  'RoyalLongsword',
  'SacrificialSword',
  'SapwoodBlade',
  'SilverSword',
  'SkyriderSword',
  'SkywardBlade',
  'SplendorOfTranquilWaters',
  'SummitShaper',
  'SwordOfDescension',
  'SwordOfNarzissenkreuz',
  'TheAlleyFlash',
  'TheBlackSword',
  'TheDockhandsAssistant',
  'TheFlute',
  'ToukabouShigure',
  'TravelersHandySword',
  'UrakuMisugiri',
  'WolfFang',
  'XiphosMoonlight',
] as const
export type WeaponSwordKey = (typeof allWeaponSwordKeys)[number]

export const allWeaponClaymoreKeys = [
  'Akuoumaru',
  'BeaconOfTheReedSea',
  'BlackcliffSlasher',
  'BloodtaintedGreatsword',
  'DebateClub',
  'FavoniusGreatsword',
  'FerrousShadow',
  'ForestRegalia',
  'KatsuragikiriNagamasa',
  'LithicBlade',
  'LuxuriousSeaLord',
  'MailedFlower',
  'MakhairaAquamarine',
  'OldMercsPal',
  'PortablePowerSaw',
  'PrototypeArchaic',
  'Rainslasher',
  'RedhornStonethresher',
  'RoyalGreatsword',
  'SacrificialGreatsword',
  'SerpentSpine',
  'SkyriderGreatsword',
  'SkywardPride',
  'SnowTombedStarsilver',
  'SongOfBrokenPines',
  'TalkingStick',
  'TheBell',
  'TheUnforged',
  'TidalShadow',
  'UltimateOverlordsMegaMagicSword',
  'Verdict',
  'WasterGreatsword',
  'Whiteblind',
  'WhiteIronGreatsword',
  'WolfsGravestone',
] as const
export type WeaponClaymoreKey = (typeof allWeaponClaymoreKeys)[number]

export const allWeaponPolearmKeys = [
  'BalladOfTheFjords',
  'BeginnersProtector',
  'BlackcliffPole',
  'BlackTassel',
  'CalamityQueller',
  'CrescentPike',
  'CrimsonMoonsSemblance',
  'Deathmatch',
  'DialoguesOfTheDesertSages',
  'DragonsBane',
  'DragonspineSpear',
  'EngulfingLightning',
  'FavoniusLance',
  'Halberd',
  'IronPoint',
  'KitainCrossSpear',
  'LithicSpear',
  'MissiveWindspear',
  'Moonpiercer',
  'PrimordialJadeWingedSpear',
  'ProspectorsDrill',
  'PrototypeStarglitter',
  'RightfulReward',
  'RoyalSpear',
  'SkywardSpine',
  'StaffOfHoma',
  'StaffOfTheScarletSands',
  'TheCatch',
  'VortexVanquisher',
  'WavebreakersFin',
  'WhiteTassel',
] as const
export type WeaponPoleArmKey = (typeof allWeaponPolearmKeys)[number]

export const allWeaponBowKeys = [
  'AlleyHunter',
  'AmosBow',
  'AquaSimulacra',
  'BlackcliffWarbow',
  'Cloudforged',
  'CompoundBow',
  'ElegyForTheEnd',
  'EndOfTheLine',
  'FadingTwilight',
  'FavoniusWarbow',
  'Hamayumi',
  'HuntersBow',
  'HuntersPath',
  'IbisPiercer',
  'KingsSquire',
  'Messenger',
  'MitternachtsWaltz',
  'MouunsMoon',
  'PolarStar',
  'Predator',
  'PrototypeCrescent',
  'RangeGauge',
  'RavenBow',
  'RecurveBow',
  'RoyalBow',
  'Rust',
  'SacrificialBow',
  'ScionOfTheBlazingSun',
  'SeasonedHuntersBow',
  'SharpshootersOath',
  'SkywardHarp',
  'Slingshot',
  'SongOfStillness',
  'TheFirstGreatMagic',
  'TheStringless',
  'TheViridescentHunt',
  'ThunderingPulse',
  'WindblumeOde',
] as const
export type WeaponBowKey = (typeof allWeaponBowKeys)[number]

export const allWeaponCatalystKeys = [
  'ApprenticesNotes',
  'AThousandFloatingDreams',
  'BalladOfTheBoundlessBlue',
  'BlackcliffAgate',
  'CashflowSupervision',
  'CranesEchoingCall',
  'DodocoTales',
  'EmeraldOrb',
  'EverlastingMoonglow',
  'EyeOfPerception',
  'FavoniusCodex',
  'FlowingPurity',
  'Frostbearer',
  'FruitOfFulfillment',
  'HakushinRing',
  'JadefallsSplendor',
  'KagurasVerity',
  'LostPrayerToTheSacredWinds',
  'MagicGuide',
  'MappaMare',
  'MemoryOfDust',
  'OathswornEye',
  'OtherworldlyStory',
  'PocketGrimoire',
  'PrototypeAmber',
  'QuantumCatalyst',
  'RoyalGrimoire',
  'SacrificialFragments',
  'SacrificialJade',
  'SkywardAtlas',
  'SolarPearl',
  'TheWidsith',
  'ThrillingTalesOfDragonSlayers',
  'TomeOfTheEternalFlow',
  'TulaytullahsRemembrance',
  'TwinNephrite',
  'WanderingEvenstar',
  'WineAndSong',
] as const
export type WeaponCatalystKey = (typeof allWeaponCatalystKeys)[number]

export const allWeaponKeys = [
  ...allWeaponSwordKeys,
  ...allWeaponClaymoreKeys,
  ...allWeaponPolearmKeys,
  ...allWeaponBowKeys,
  ...allWeaponCatalystKeys,
] as const
export type WeaponKey =
  | WeaponSwordKey
  | WeaponClaymoreKey
  | WeaponPoleArmKey
  | WeaponBowKey
  | WeaponCatalystKey

export const weaponMaxLevel: Record<RarityKey, number> = {
  1: 70,
  2: 70,
  3: 90,
  4: 90,
  5: 90,
} as const

export const weaponMaxAscension: Record<RarityKey, AscensionKey> = {
  1: 4,
  2: 4,
  3: 6,
  4: 6,
  5: 6,
} as const

export const allRefinementKeys = [1, 2, 3, 4, 5] as const
export type RefinementKey = (typeof allRefinementKeys)[number]

export const allWeaponSubstatKeys = [
  'atk_',
  'critDMG_',
  'critRate_',
  'def_',
  'eleMas',
  'enerRech_',
  'hp_',
  'physical_dmg_',
] as const
export type WeaponSubstatKey = (typeof allWeaponSubstatKeys)[number]

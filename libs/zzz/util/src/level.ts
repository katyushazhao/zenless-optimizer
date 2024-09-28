import type { PromotionKey } from '@genshin-optimizer/zzz/consts'

export const promotionMaxLevel = [10,20,30,40,50,60] as const
export const maxLevel = 60

export const ambiguousLevel = (level: number) =>
  level !== maxLevel &&
  promotionMaxLevel.includes(level as (typeof promotionMaxLevel)[number])

export const milestoneLevels = [
  [60, 5],
  [50, 5],
  [50, 4],
  [40, 4],
  [40, 3],
  [30, 3],
  [30, 2],
  [20, 2],
  [20, 1],
  [10, 1],
  [10, 0],
  [1, 0],
] as const

export const getLevelString = (
  level: number,
  promotion: PromotionKey
): string => `${level}/${promotionMaxLevel[promotion]}`

export function validateLevelPromotion(
  level: number,
  promotion: PromotionKey
): { level: number; promotion: PromotionKey } {
  if (typeof level !== 'number' || level < 1 || level > 60) level = 1
  if (typeof promotion !== 'number' || promotion < 0 || promotion > 5)
    promotion = 0

  if (
    level > promotionMaxLevel[promotion] ||
    level < (promotionMaxLevel[promotion - 1] ?? 0)
  )
    promotion = promotionMaxLevel.findIndex(
      (maxLvl) => level <= maxLvl
    ) as PromotionKey
  return { level, promotion }
}

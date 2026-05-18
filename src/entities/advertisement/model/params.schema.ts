import { z } from 'zod'

const STATUSES = ['pending', 'approved', 'rejected', 'draft'] as const
const SORT_BY = ['createdAt', 'price', 'priority'] as const
const SORT_ORDER = ['asc', 'desc'] as const

const statusArr = z.preprocess(
    (v) => {
        const list = v === undefined ? [] : Array.isArray(v) ? v : [v]
        return list.filter(
            (item): item is (typeof STATUSES)[number] =>
                typeof item === 'string' && (STATUSES as readonly string[]).includes(item),
        )
    },
    z.array(z.enum(STATUSES)),
)

const intParam = (min: number, fallback: number) =>
    z.preprocess(
        (v) => (typeof v === 'string' ? Number(v) : v),
        z.number().int().min(min).catch(fallback),
    )

const optionalIntParam = (min: number) =>
    z.preprocess(
        (v) => (v === undefined || v === '' ? undefined : typeof v === 'string' ? Number(v) : v),
        z.number().int().min(min).optional().catch(undefined),
    )

const singleStringParam = z.preprocess(
    (v) => (Array.isArray(v) ? undefined : v),
    z.string().default(''),
)

export const advertisementsParamsSchema = z.object({
    page: intParam(1, 1).default(1),
    limit: intParam(1, 10).default(10),
    status: statusArr.default([]),
    categoryId: optionalIntParam(0),
    minPrice: optionalIntParam(0),
    maxPrice: optionalIntParam(0),
    search: singleStringParam,
    sortBy: z.enum(SORT_BY).catch('createdAt').default('createdAt'),
    sortOrder: z.enum(SORT_ORDER).catch('asc').default('asc'),
})

export type IAdvertisementsParams = z.infer<typeof advertisementsParamsSchema>
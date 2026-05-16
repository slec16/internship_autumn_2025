import type { ModeratorStats } from "@entities/stats"

export type Moderator = {
    id: number
    name: string
    email: string
    role: string
    statistics: ModeratorStats
    permissions: string[]
}
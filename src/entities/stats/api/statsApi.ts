import type { 
    Period,
    StatsSummary,
    ActivityData,
} from "../model/types"

const baseUrl = "/api/v1"

export const StatsApi = {
    getSummaryStats: async (period: Period): Promise<StatsSummary> => {
        const response = await fetch(`${baseUrl}/stats/summary?period=${period}`)
        if (!response.ok) throw new Error('Failed to fetch advertisements')
        return response.json()
    },

    getActivityChart: async (period: Period): Promise<ActivityData[]> => {
        const response = await fetch(`${baseUrl}/stats/chart/activity?period=${period}`)
        if (!response.ok) throw new Error('Failed to fetch advertisements')
        return response.json()
    },

    getDecisionsChart: async (period: Period) => {
        const response = await fetch(`${baseUrl}/stats/chart/decisions?period=${period}`)
        if (!response.ok) throw new Error('Failed to fetch advertisements')
        return response.json()
    },

    getCategoriesChart: async (period: Period) => {
        const response = await fetch(`${baseUrl}/stats/chart/categories?period=${period}`)
        if (!response.ok) throw new Error('Failed to fetch advertisements')
        return response.json()
    }
}
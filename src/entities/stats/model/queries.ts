import { useQuery } from "@tanstack/react-query"
import { StatsApi } from "../api/statsApi"
import type { Period } from "./types"

// export const statsKeys = {
//     all: ['stats'] as const,
//     lists: () => [...statsKeys.all, 'list'] as const,
//     list: (filters: string) => [...statsKeys.lists(), { filters }] as const,
//     details: () => [...statsKeys.all, 'detail'] as const,
//     detail: (id: string) => [...statsKeys.details(), id] as const
// }

export const statsKeys = {
    all: ['stats'] as const,
    summary: (period: Period) => [...statsKeys.all, 'summary', period] as const,
    activityChart: (period: Period) => [...statsKeys.all, 'activityChart', period] as const,
    decisionsChart: (period: Period) => [...statsKeys.all, 'decisionsChart', period] as const,
    categoriesChart: (period: Period) => [...statsKeys.all, 'categoriesChart', period] as const,
}

export const useSummaryStats = (period: Period) => {
    return useQuery({
        queryKey: statsKeys.summary(period),
        queryFn: () => StatsApi.getSummaryStats(period),
        // staleTime: 1 * 60 * 1000
    })
}

export const useActivityChart = (period: Period) => {
    return useQuery({
        queryKey: statsKeys.activityChart(period),
        queryFn: () => StatsApi.getActivityChart(period),
        // staleTime: 1 * 60 * 1000
    })
}

export const useDecisionsChart = (period: Period) => {
    return useQuery({
        queryKey: statsKeys.decisionsChart(period),
        queryFn: () => StatsApi.getDecisionsChart(period),
        // staleTime: 1 * 60 * 1000
    })
}

export const useCategoriesChart = (period: Period) => {
    return useQuery({
        queryKey: statsKeys.categoriesChart(period),
        queryFn: () => StatsApi.getCategoriesChart(period),
        // staleTime: 1 * 60 * 1000
    })
}

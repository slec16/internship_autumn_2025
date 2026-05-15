import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { StatsApi } from "../api/statsApi"

export const statsKeys = {
    all: ['stats'] as const,
    lists: () => [...statsKeys.all, 'list'] as const,
    list: (filters: string) => [...statsKeys.lists(), { filters }] as const,
    details: () => [...statsKeys.all, 'detail'] as const,
    detail: (id: string) => [...statsKeys.details(), id] as const
}

export const useSummaryStats = (period) => {
    return useQuery({
        queryKey: [...statsKeys.lists(), period],
        queryFn: () => StatsApi.getSummaryStats(period),
        staleTime: 1 * 60 * 1000
    })
}

export const useActivityChart = (period) => {
    return useQuery({
        queryKey: [...statsKeys.lists(), period],
        queryFn: () => StatsApi.getActivityChart(period),
        staleTime: 1 * 60 * 1000
    })
}

export const useDecisionsChart = (period) => {
    return useQuery({
        queryKey: [...statsKeys.lists(), period],
        queryFn: () => StatsApi.getDecisionsChart(period),
        staleTime: 1 * 60 * 1000
    })
}

export const useCategoriesChart = (period) => {
    return useQuery({
        queryKey: [...statsKeys.lists(), period],
        queryFn: () => StatsApi.getCategoriesChart(period),
        staleTime: 1 * 60 * 1000
    })
}

import { useQuery } from "@tanstack/react-query"
import { moderatorApi } from "../api/moderatorApi"
import type { Moderator } from "./types"

export const moderatorKeys = {
    all: ['moderator'] as const,
    lists: () => [...moderatorKeys.all, 'list'] as const,
    list: (filters: string) => [...moderatorKeys.lists(), { filters }] as const,
    details: () => [...moderatorKeys.all, 'detail'] as const,
    detail: (id: string) => [...moderatorKeys.details(), id] as const
}

export const useModeratorInfo = () => {
    return useQuery<Moderator>({
        queryKey: [...moderatorKeys.lists()],
        queryFn: () => moderatorApi.getModeratorInfo(),
        staleTime: 1 * 60 * 1000
    })
}
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { advertisementApi } from "../api/advertisementApi"
import type {
    Advertisement,
    IAdvertisementsParams,
    IAdvertisementsRejectParams
} from "./types"

export const advertisementsKeys = {
    all: ['advertisement'] as const,
    lists: () => [...advertisementsKeys.all, 'list'] as const,
    list: (filters: string) => [...advertisementsKeys.lists(), { filters }] as const,
    details: () => [...advertisementsKeys.all, 'detail'] as const,
    detail: (id: string) => [...advertisementsKeys.details(), id] as const
}


export const useAdvertisements = (params: Partial<IAdvertisementsParams>) => {
    return useQuery({
        queryKey: [...advertisementsKeys.lists(), params,],
        queryFn: () => advertisementApi.getAdvertisements(params),
        staleTime: 1 * 60 * 1000
    })
}

export const useAdvertisement = (id: string, enabled = true) => {
    return useQuery<Advertisement>({
        queryKey: advertisementsKeys.detail(id),
        queryFn: () => advertisementApi.getAdvertisement(id),
        enabled,
        staleTime: 1 * 60 * 1000,
    })
}


export const useApproveAdvertisement = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id }: { id: string }) => advertisementApi.approveAdvertisement(id),
        onSuccess: (_result, { id }) => {
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.detail(id) })
        }
    })
}

export const useRejectAdvertisement = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, params }: { id: string, params: IAdvertisementsRejectParams }) => advertisementApi.rejectAdvertisement(id, params),
        onSuccess: (_result, { id }) => {
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.detail(id) })
        }
    })
}

export const useRequestChangesAdvertisement = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, params }: { id: string, params: IAdvertisementsRejectParams }) => advertisementApi.requestChangesAdvertisement(id, params),
        onSuccess: (_result, { id }) => {
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.detail(id) })
        }
    })
}
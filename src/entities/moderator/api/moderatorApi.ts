import type { Moderator } from "../model/types"
const baseUrl = "/api/v1"

export const moderatorApi = {
    getModeratorInfo: async (): Promise<Moderator> => {
        const response = await fetch(`${baseUrl}/moderators/me`)
        if (!response.ok) throw new Error('Failed to fetch advertisements')
        return response.json()
    },
}
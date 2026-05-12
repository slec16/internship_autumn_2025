import type {
    Advertisement,
    IAdvertisementsParams,
    IAdvertisementsRejectParams,
    IAdvertisementsResponse
} from "../model/types"


// TODO: add .env file
// const baseUrl = "http://localhost:3001/api/v1"
const baseUrl = "/api/v1"

export const advertisementApi = {
    getAdvertisements: async ( params: Partial<IAdvertisementsParams> ): Promise<IAdvertisementsResponse> => {
        const response = await fetch(`${baseUrl}/ads`)
        if (!response.ok) throw new Error('Failed to fetch advertisements')
        return response.json()
    },

    getAdvertisement: async ( id: string ): Promise<Advertisement> => {
        const response = await fetch(`${baseUrl}/ads/${id}`)
        if (!response.ok) throw new Error('Failed to fetch advertisement')
        return response.json()
    },

    approveAdvertisement: async ( id: string ) => {
        const response = await fetch(`${baseUrl}/ads/${id}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        } )
    },

    rejectAdvertisement: async ( id: string, params: IAdvertisementsRejectParams ) => {
        const response = await fetch(`${baseUrl}/ads/${id}/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
    },

    requestChangesAdvertisement: async ( id: string, params: IAdvertisementsRejectParams ) => {
        const response = await fetch(`${baseUrl}/ads/${id}/request-changes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
    }

    
}
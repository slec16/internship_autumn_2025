export type Advertisement = {
    id: number
    title: string
    description: string
    price: number
    category: string
    categoryId: number
    status: Status
    priority: Priority
    createdAt: string
    updatedAt: string
    images: string[]
    seller: Seller
    characteristics: Record<string, string>
    moderationHistory: Record<string, string>[]
}

export type Status = "pending" | "approved" | "rejected" | "draft"

export type Priority = "normal" | "urgent"

export type Seller = {
    id: number,
    name: string
    rating: string,
    totalAds: number
    registeredAt: string
}

export interface IAdvertisementsParams {
    page: number
    limit: number
    status: Status[]
    categoryId: number
    minPrice: number
    maxPrice: number
    search: string
    sortBy: "createdAt" | "price" | "priority"
    sortOrder: "asc" | "desc"
}

type Pagination = {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
}

export interface IAdvertisementsResponse {
    ads: Advertisement[]
    pagination: Pagination
}

export enum reason {
    "Зaпрещенный товар",
    "Неверная категория",
    "Некорректное описание",
    "Проблемы с фото",
    "Подозрение на мошенничество",
    "Другое"
}

export interface IAdvertisementsRejectParams {
    reason: reason
    comment: string
}
import { type Status } from "../model/types"

export const getStatusLabel = (status: Status): string => {
    const labels: Record<Status, string> = {
        pending: "На модерации",
        approved: "Одобрено",
        rejected: "Отклонено",
        draft: "На дороботке"
    }
    return labels[status]
}

export const getStatusColor = (status: Status) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "approved":
            return "bg-green-100 text-green-800";
        case "rejected":
            return "bg-red-100 text-red-800";
        case "draft":
            return "bg-gray-100 text-gray-800";
    }
}

export const categoryMap: Record<number, string> = {
    0: "Электроника",
    1: "Недвижимость",
    2: "Транспорт",
    3: "Работа",
    4: "Услуги",
    5: "Животные",
    6: "Мода",
    7: "Детское"
}

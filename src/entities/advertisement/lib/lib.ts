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

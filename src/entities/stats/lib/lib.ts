import type { Period } from "../model/types"
export const convertTabValueToAPeriod = (period: string): Period => {
    switch (period) {
        case "Сегодня":
            return "today"
        case "7 дней":
            return "week"
        case "30 дней":
            return "month"
        default: 
            return 'week'
    }
}

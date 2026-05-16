export type StatsSummary = {
    totalReviewed: number
    totalReviewedToday: number
    totalReviewedThisWeek: number
    totalReviewedThisMonth: number
    approvedPercentage: number
    rejectedPercentage: number
    requestChangesPercentage: number
    averageReviewTime: number
}

export type ActivityData = {
    date: string
    approved: number
    rejected: number
    requestChanges: number
}

export type DecisionsData = {
    approved: number
    rejected: number
    requestChanges: number
}

export type ModeratorStats = {
    totalReviewed: number
    todayReviewed: number
    thisWeekReviewed: number
    thisMonthReviewed: number
    averageReviewTime: number
    approvalRate: number
}

export type Period = "today" | "week" | "month"
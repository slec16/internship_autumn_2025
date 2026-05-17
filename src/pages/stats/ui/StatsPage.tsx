import { useState } from "react"
import { Button, Segmented, Spin } from "antd"
import {
    RiseOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'
import ModeratorInfo from "@entities/moderator"
import {
    useSummaryStats,
    convertTabValueToAPeriod
} from "@entities/stats"
import StatsTile from "./StatsTile"
import PDFButton from "@/features/pdf-report"
import CSVButton from "@/features/csv-report"
import ActivityChart from "@/features/activity-chart"
import CategoriesChart from "@/features/categories-chart"
import DecisionsChart from "@/features/decisions-chart"


const StatsPage = () => {

    const [period, setPeriod] = useState("7 дней")

    const { data: summaryStats, isLoading, error, refetch } = useSummaryStats(convertTabValueToAPeriod(period))

    console.log(summaryStats)

    if (isLoading) return (
        <div className="text-center py-12">
            <Spin description="Загрузка..." size="large" />
        </div>
    )

    if (error || !summaryStats) return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Объявление не найдено</h2>
            <Button
                onClick={() => refetch()}
            >
                Повторить
            </Button>
        </div>
    )

    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Статистика модератора</h3>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex gap-2">
                        <PDFButton />
                        <CSVButton />
                    </div>
                    <Segmented<string>
                        options={['Сегодня', '7 дней', '30 дней']}
                        size="large"
                        styles={{
                            root: {
                                backgroundColor: "var(--segmented-color-primary)"

                            }
                        }}
                        value={period}
                        onChange={(value) => setPeriod(value)}
                    />
                </div>
            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6"> */}
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 pb-4 pr-0 lg:pr-4">
                    <ModeratorInfo />
                </div>
                <div className="space-y-6 w-full lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsTile
                            title="Проверено за период"
                            value={summaryStats.totalReviewed}
                            unit=""
                            icon={<RiseOutlined />}
                            iconColor="bg-blue-100 dark:bg-blue-800"
                        />
                        <StatsTile
                            title="Одобрено"
                            value={summaryStats.approvedPercentage}
                            unit="%"
                            icon={<CheckCircleOutlined style={{ color: "rgb(0, 201, 80)" }} />}
                            iconColor="bg-green-100 dark:bg-green-900"
                        />
                        <StatsTile
                            title="Отклонено"
                            value={summaryStats.rejectedPercentage}
                            unit="%"
                            icon={<CloseCircleOutlined style={{ color: "rgb(251, 44, 54)" }} />}
                            iconColor="bg-red-100 dark:bg-red-900"
                        />
                        <StatsTile
                            title="Среднее время"
                            value={summaryStats.averageReviewTime}
                            unit="c."
                            icon={<ClockCircleOutlined />}
                            iconColor="bg-blue-100 dark:bg-blue-800"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <ActivityChart period={period} />
                        </div>
                        <DecisionsChart period={period} />
                        <CategoriesChart period={period} />
                    </div>
                </div>

            </div>

        </>
    )
}

export default StatsPage
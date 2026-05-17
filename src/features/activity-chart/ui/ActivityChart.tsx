import { Spin, Button } from "antd"
import {
    useActivityChart,
    convertTabValueToAPeriod
} from "@entities/stats"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useTheme } from "@/shared/lib/theme"

const ActivityChart = ({ period }: { period: string }) => {

    const { theme } = useTheme()
    const { data: activity, isLoading, error, refetch } = useActivityChart(convertTabValueToAPeriod(period))

    if (isLoading) return (
        <div className="text-center py-12">
            <Spin description="Загрузка..." size="large" />
        </div>
    )

    if (error || !activity) return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Объявление не найдено</h2>
            <Button
                onClick={() => refetch()}
            >
                Повторить
            </Button>
        </div>
    )

    return (
        <div className="w-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
                Активность: {period}
            </h3>
            <div >
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={activity}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: theme === "dark" ? '#d1d5db' : '#030712' }}
                        />
                        <YAxis
                            tick={{ fill: theme === "dark" ? '#d1d5db' : '#030712' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme === "dark" ? '#1f2937' : '#ffffff',
                                border: `1px solid ${theme === "dark" ? '#374151' : '#e5e7eb'}`,
                                borderRadius: '8px',
                                color: theme === "dark" ? '#f9fafb' : '#111827',
                            }}
                            isAnimationActive={false}
                            cursor={{
                                fill: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                stroke: theme === 'dark' ? '#4b5563' : '#d1d5db',
                                strokeWidth: 1,
                            }}
                        />
                        <Legend />
                        <Bar dataKey="approved" fill="#00c950" name="Одобрено объявлений" />
                        <Bar dataKey="rejected" fill="#fb2c36" name="Отклонено объявлений" />
                        <Bar dataKey="requestChanges" fill="#2b7fff" name="Отправлено на дороботку" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ActivityChart
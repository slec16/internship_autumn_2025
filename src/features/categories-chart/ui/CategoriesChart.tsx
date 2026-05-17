import { Spin, Button } from "antd"
import {
    useCategoriesChart,
    convertTabValueToAPeriod
} from "@entities/stats"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "@/shared/lib/theme"


const CategoriesChart = ({ period }: { period: string }) => {

    const { theme } = useTheme()
    const { data: category, isLoading, error, refetch } = useCategoriesChart(convertTabValueToAPeriod(period))

    if (isLoading) return (
        <div className="text-center py-12">
            <Spin description="Загрузка..." size="large" />
        </div>
    )

    if (error || !category) return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Не удалось загрузить статистику</h2>
            <Button
                onClick={() => refetch()}
            >
                Повторить
            </Button>
        </div>
    )

    const preparedData = (category: Record<string, number>) => {
        return Object.entries(category).map(el => {
            return { name: el[0], value: el[1] }
        })
    }

    const isEmpty = preparedData(category).reduce((acc, cur) => acc = + cur.value, 0) == 0

    return (
        <div className="w-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
                Распределение по категориям:
            </h3>
            <div>{
                isEmpty ?
                    <div className="flex justify-center text-gray-700 dark:text-gray-400">Нет данных</div>
                    :
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={preparedData(category)}
                            layout="vertical"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                tick={{ fill: theme === "dark" ? '#d1d5db' : '#030712' }}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
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
                            <Bar dataKey="value" fill="#8b5cf6" name="Количество" />
                        </BarChart>
                    </ResponsiveContainer>
            }
            </div>
        </div>
    )
}

export default CategoriesChart
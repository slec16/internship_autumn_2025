import { Spin, Button } from "antd"
import {
    useDecisionsChart,
    convertTabValueToAPeriod,
    addSectorColor,
    type DecisionsData,
} from "@entities/stats"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useTheme } from "@/shared/lib/theme"
import { getModerationActionLabel } from "@entities/advertisement"

const DecisionsChart = ({ period }: { period: string }) => {

    const { theme } = useTheme()
    const { data: decisions, isLoading, error, refetch } = useDecisionsChart(convertTabValueToAPeriod(period))

    if (isLoading) return (
        <div className="text-center py-12">
            <Spin description="Загрузка..." size="large" />
        </div>
    )

    if (error || !decisions) return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Не удалось загрузить статистику</h2>
            <Button
                onClick={() => refetch()}
            >
                Повторить
            </Button>
        </div>
    )

    const preparedData = (decisions: DecisionsData) => {
        return Object.entries(decisions).map(el => {
            return { key: el[0], value: el[1], fill: addSectorColor(el[0]) }
        })
    }

    const isEmpty = preparedData(decisions).reduce((acc, cur) => acc = + cur.value, 0) == 0

    return (
        <div className="w-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
                Распределение решений:
            </h3>
            <div>{
                isEmpty ?
                    <div className="flex justify-center text-gray-700 dark:text-gray-400">Нет данных</div>
                    :
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Tooltip
                                isAnimationActive={true}
                                content={({ active, payload }) => {
                                    if (!active || !payload || !payload.length) return null
                                    const data = payload[0].payload
                                    const name = getModerationActionLabel(data.key)
                                    const percent = `${data.value.toFixed(0)}%`
                                    return (
                                        <div
                                            style={{
                                                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                                                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                                                borderRadius: '8px',
                                                padding: '8px 12px',
                                                color: theme === 'dark' ? '#f9fafb' : '#111827',
                                                fontSize: 14,
                                            }}
                                        >
                                            {name}: {percent}
                                        </div>
                                    )
                                }}
                                cursor={{
                                    fill: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                    stroke: theme === 'dark' ? '#4b5563' : '#d1d5db',
                                    strokeWidth: 1,
                                }}
                            />
                            <Legend
                                formatter={(value, entry) => {
                                    const niceName = getModerationActionLabel(entry?.payload?.key || value);
                                    return <span style={{ color: theme === 'dark' ? '#f3f4f6' : '#111827' }}>{niceName}</span>;
                                }}
                            />
                            <Pie
                                data={preparedData(decisions)}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                            />
                        </PieChart>
                    </ResponsiveContainer>
            }
            </div>
        </div>
    )
}

export default DecisionsChart
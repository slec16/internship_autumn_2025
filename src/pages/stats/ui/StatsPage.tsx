import { useState } from "react"
import { Button, Segmented } from "antd"
import {
    ExportOutlined,
    FilePdfOutlined,
    RiseOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'
import ModeratorInfo from "./ModeratorInfo"

const StatsPage = () => {

    const [period, setPeriod] = useState("7 дней")

    const exportToCSV = () => {

    }

    const exportToPDF = () => {

    }

    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Статистика модератора</h3>
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <Button
                            onClick={exportToCSV}
                            size="large"
                        >
                            <ExportOutlined />
                            Экспорт CSV
                        </Button>
                        <Button
                            onClick={exportToPDF}
                            size="large"
                        >
                            <FilePdfOutlined />
                            PDF-отчёт
                        </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
                <ModeratorInfo />
                <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Проверено за период</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">78</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">7 дней</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                                    <RiseOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Одобрено</p>
                                    <p className="text-3xl font-bold text-green-600 mt-1">8</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">17% от общего</p>
                                </div>
                                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                    <CheckCircleOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Отклонено</p>
                                    <p className="text-3xl font-bold text-red-600 mt-1">78</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">17% от общего</p>
                                </div>
                                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                                    <CloseCircleOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Среднее время</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">45</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Секунд</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                                    <ClockCircleOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircleOutlined style={{ color: "green" }} />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Процент одобренных</span>
                                </div>
                                <span className="text-2xl font-bold text-green-600">{70}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${70}%` }}
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <CloseCircleOutlined style={{ color: "red" }} />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Процент отклоненных</span>
                                </div>
                                <span className="text-2xl font-bold text-red-600">{15}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div
                                    className="bg-red-600 h-2 rounded-full"
                                    style={{ width: `${15}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatsPage
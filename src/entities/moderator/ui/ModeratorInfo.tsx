import { useModeratorInfo } from "../model/queries"
import { Spin, Collapse, Button } from "antd"
import { UserOutlined } from "@ant-design/icons"


const ModeratorInfo = () => {

    const { data: moderatorInfo, isLoading, error, refetch } = useModeratorInfo()

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-center py-7">
                    <Spin description="Загрузка..." size="large" />
                </div>
            </div>
        )
    }

    if (error || !moderatorInfo) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-center py-7">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Не удалось загрузить информацию о пользователе
                    </p>
                    <Button
                        onClick={() => refetch()}
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        )
    }


    const collapseItems = [
        {
            key: '1',
            label: 'Статистика',
            children: <div className="space-y-2">
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-2">Всего проверено:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.statistics.totalReviewed}</p>
                </div>
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-2">Среднее время:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.statistics.averageReviewTime} c.</p>
                </div>
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-2">Процент одобрения:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.statistics.approvalRate} %</p>
                </div>
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-2">Проверено сегодня:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.statistics.todayReviewed}</p>
                </div>
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-2">Проверено за неделю:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.statistics.thisWeekReviewed}</p>
                </div>
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-2">Проверено за месяц:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.statistics.thisMonthReviewed}</p>
                </div>
            </div>
        },
        {
            key: '2',
            label: 'Права',
            children: <div className="space-y-2">
                {moderatorInfo.permissions.map(el => (
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-2">{el}</p>
                ))}
            </div>
        },
    ]


    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex justify-between pb-2 mb-2 border-b-2 border-gray-200 dark:border-gray-500">
                <div className="flex items-center p-2 rounded-full bg-blue-200 dark:bg-blue-500">
                    <UserOutlined />
                </div>
                <p className="text-xl text-gray-900 dark:text-gray-300">{moderatorInfo.name}</p>
            </div>
            <div className="space-y-1 mb-3">
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-1">email:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.email}</p>
                </div>
                <div className="flex items-start">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mr-1">Роль:</p>
                    <p className="text-gray-800 dark:text-gray-200">{moderatorInfo.role}</p>
                </div>
            </div>
            <Collapse
                items={collapseItems}
            />
        </div>
    )
}

export default ModeratorInfo
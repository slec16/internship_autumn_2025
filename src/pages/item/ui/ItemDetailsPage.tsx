import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { 
    useAdvertisement,
} from "@/entities/advertisement"
import { getStatusLabel, getStatusColor, getModerationActionToColor, getModerationActionLabel } from "@entities/advertisement"
import { Button } from "antd"
import {
    LeftOutlined,
    RightOutlined,
    PictureOutlined,
    UserOutlined,
    StarOutlined,
    InboxOutlined,
    CalendarOutlined,
    CheckOutlined,
    CloseOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons'
import ModerationBlock from "@features/moderation-action"

const ItemDetailsPage = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [selectedImageIndex, setSelectedImageIndex] = useState(0)


    if (!id) return (
        <div>Возникла ошибка</div>
    )

    const { data: advertisement, isLoading, error } = useAdvertisement(id)

    console.log(advertisement)

    if (!advertisement) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Объявление не найдено</h2>
                <Link to="/list" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
                    Вернуться к списку
                </Link>
            </div>
        );
    }

    if (error) return (
        <div>Возникла ошибка</div>
    )

    if (isLoading) return (
        <div>Загрузка...</div>
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => navigate("/list")}
                    icon={<LeftOutlined />}
                    size="large"
                >
                    Назад к списку
                </Button>

                {/* TODO: next/prev ads */}
                <div className="flex gap-2">
                    <Link
                        to={`/item/${advertisement.id - 1}`}
                        className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
                    >
                        <LeftOutlined />
                        Предыдущее
                    </Link>
                    <Link
                        to={`/item/${advertisement.id + 1}`}
                        className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
                    >
                        Следующее
                        <RightOutlined />
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-2">{advertisement.title}</h1>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm px-3 py-1 rounded ${getStatusColor(advertisement.status)}`}>
                                        {getStatusLabel(advertisement.status)}
                                    </span>
                                    {advertisement.priority === "urgent" && (
                                        <span className="flex text-sm px-3 py-1 rounded bg-red-100 text-red-800">
                                            Срочно
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-gray-900 dark:text-gray-200">
                                    {advertisement.price.toLocaleString("ru-RU")} ₽
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <div className="flex items-center justify-center w-full h-full object-cover">
                                    <PictureOutlined style={{ fontSize: '60px', color: 'var(--icon-color-primary)' }} />
                                </div>
                            </div>
                            {advertisement.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {advertisement.images.map((_img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === idx
                                                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                                : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                                                <div className="flex items-center justify-center w-full h-full object-cover">
                                                    <PictureOutlined style={{ fontSize: '30px', color: 'var(--icon-color-primary)' }} />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-300 dark:border-gray-600 mt-4">
                            <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Категория</div>
                                <div className="font-medium text-gray-900 dark:text-gray-200">{advertisement.category}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Дата создания</div>
                                <div className="font-medium text-gray-900 dark:text-gray-200">
                                    {new Date(advertisement.createdAt).toLocaleDateString('ru-RU')}
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Описание</h3>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{advertisement.description}</p>
                        </div>
                        {Object.keys(advertisement.characteristics).length > 0 && (
                            // возможно переписать на timeline - ant
                            <div className="pt-4">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-3">Характеристики</h3>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <tbody>
                                            {Object.entries(advertisement.characteristics).map(([key, value], idx) => (
                                                <tr key={key} className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/80" : "bg-white dark:bg-gray-800/70"}>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-400 w-1/3">
                                                        {key}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center gap-2">
                            Информация о продавце
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <UserOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Имя</div>
                                    <div className="font-medium text-gray-900 dark:text-gray-200">{advertisement.seller.name}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <StarOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Рейтинг</div>
                                    <div className="font-medium text-gray-900 dark:text-gray-200 flex items-center gap-1">
                                        {advertisement.seller.rating}
                                        <span className="text-gray-500 dark:text-gray-200 text-sm">/ 5.0</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <InboxOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Объявлений</div>
                                    <div className="font-medium text-gray-900 dark:text-gray-200">{advertisement.seller.totalAds}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <CalendarOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Регистрация</div>
                                    <div className="font-medium text-gray-900 dark:text-gray-200">
                                        {new Date(advertisement.seller.registeredAt).toLocaleDateString('ru-RU')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <ModerationBlock id={id} />
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">История модерации</h2>
                        {advertisement.moderationHistory.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <ClockCircleOutlined />
                                </div>
                                <p className="text-gray-500 text-sm">История пустая</p>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="space-y-6">
                                    {advertisement.moderationHistory.map((action, _idx) => (
                                        <div key={action.id} className="relative pl-10">
                                            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${action.action === "approved" ? "bg-green-200 dark:bg-green-400" :
                                                action.action === "rejected" ? "bg-red-200 dark:bg-red-400" :
                                                    "bg-yellow-100"
                                                }`}>
                                                {action.action === "approved" ? (
                                                    <CheckOutlined />
                                                ) : action.action === "rejected" ? (
                                                    <CloseOutlined />
                                                ) : (
                                                    <ClockCircleOutlined />
                                                )}
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className={`text-xs px-2 py-1 rounded ${getModerationActionToColor(action.action)}`}>
                                                        {getModerationActionLabel(action.action)}
                                                    </span>
                                                    <span className="text-xs text-gray-600 dark:text-gray-300">
                                                        {new Date(action.timestamp).toLocaleDateString('ru-RU')}
                                                    </span>
                                                </div>
                                                {action.reason && (
                                                    <div className="flex items-center mb-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-1 rounded-xl overflow-hidden">
                                                        <span className="text-xs px-2 py-1 underline shrink-0">
                                                            Причина:
                                                        </span>
                                                        <p className="text-xs wrap-break-word overflow-y-auto max-h-20">
                                                            {action.reason}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
                                                    {action.moderatorName}
                                                </div>
                                                {action.comment && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                                                        "{action.comment}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetailsPage
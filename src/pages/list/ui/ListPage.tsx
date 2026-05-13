import { useAdvertisements } from "@/entities/advertisement"
import Filters from "@/widgets/filters"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { getStatusLabel, categoryMap, type Status } from "@entities/advertisement"
import { Pagination, type PaginationProps } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { Link } from "react-router"

const ListPage = () => {

    const [params, setParams] = useQueryParams()

    const page = (params.page as string) || '1'

    const { data: response, isLoading, error } = useAdvertisements(params)

    console.log(response)

    const onChangePage: PaginationProps['onChange'] = (page) => {
        console.log(page)
        setParams((prev) => ({ ...prev, page: String(page) }))
    }

    const getStatusColor = (status: Status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            case "draft":
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div>
            <Filters
                totalItems={response?.pagination.totalItems}
            />
            {isLoading && (
                <div>Загрузка...</div>
            )}
            {error && (
                <div>Произошла ошибка</div>
            )}
            {response && (
                <div className="py-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                        {response.ads.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg dark:hover:shadow-2xl transition-all overflow-hidden relative"
                            >
                                {/* TODO: for bulk operation */}
                                <div className="absolute top-3 left-3 z-10">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 bg-white shadow-lg cursor-pointer"
                                    />
                                </div>
                                <Link
                                    to={`/item/${item.id}`}
                                    className="flex flex-col h-full"
                                >
                                    <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <div className="flex items-center justify-center w-full h-full object-cover">
                                            <PictureOutlined style={{ fontSize: '40px', color: 'var(--icon-color-primary)' }} />
                                        </div>
                                        {item.priority === "urgent" && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                Срочно
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="px-4 py-2 font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">{item.title}</h3> 
                                    <div className="px-4 pb-2 space-y-3  mt-auto">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                {item.price.toLocaleString("ru-RU")} ₽
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                                                {getStatusLabel(item.status)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                            <span>{categoryMap[item.categoryId]}</span>
                                            <span>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        current={Number(page)}
                        align="center"
                        showSizeChanger={false}
                        onChange={onChangePage}
                        total={response.pagination.totalItems}
                    />
                </div>
            )}
        </div>
    )
}

export default ListPage
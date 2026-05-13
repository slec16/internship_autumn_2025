import { useState } from 'react'
import { Input, Button, Checkbox, InputNumber, Select } from 'antd'
import { SearchOutlined, FilterOutlined, BarsOutlined } from '@ant-design/icons'
import { getStatusLabel, categoryMap, type Status } from "@entities/advertisement"
import { useQueryParams } from '@/shared/lib/useQueryParams'

const Filters = () => {

    const [params, setParams] = useQueryParams()
    const [showFilters, setShowFilters] = useState(true)

    const search = (params.search as string) || ''
    const selectedStatuses = (params.statuses as string[]) || []
    const selectedCategories = (params.categories as string[]) || []
    const minPrice = (params.min as string) || ''
    const maxPrice = (params.max as string) || ''

    const toggleStatus = (status: Status) => {

        let currentStatuses = selectedStatuses
        if (!Array.isArray(selectedStatuses)) {
            if (typeof currentStatuses === 'string' && currentStatuses) {
                currentStatuses = [currentStatuses]
            } else {
                currentStatuses = []
            }
        }

        const updatedStatuses = currentStatuses.includes(status)
            ? currentStatuses.filter(s => s !== status)
            : [...currentStatuses, status];


        setParams((prev) => ({
            ...prev,
            statuses: updatedStatuses
        }))

    }

    const toggleCategories = (categoryId: string) => {

        let currentCategories = selectedCategories
        if (!Array.isArray(selectedCategories)) {
            if (typeof currentCategories === 'string' && currentCategories) {
                currentCategories = [currentCategories]
            } else {
                currentCategories = []
            }
        }

        const updatedCategories = currentCategories.includes(categoryId)
            ? currentCategories.filter(s => s !== categoryId)
            : [...currentCategories, categoryId];


        setParams((prev) => ({
            ...prev,
            categories: updatedCategories
        }))

    }


    return (
        <div className="bg-blue-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 border border-gray-100 dark:border-gray-700">
            <div className="flex gap-4 items-start">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Поиск по названию объявления..."
                        size='large'
                        prefix={<SearchOutlined />}
                        allowClear
                        value={search}
                        onChange={(e) =>
                            setParams((prev) => ({ ...prev, search: e.target.value }))
                        }
                    />
                </div>
                <Button
                    icon={<FilterOutlined />}
                    color='geekblue'
                    size='large'
                    onClick={() => setShowFilters(!showFilters)}
                    variant={showFilters ? "filled" : "solid"}
                >
                    Фильтры
                </Button>
            </div>
            {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-blue-100 dark:border-gray-600'>
                        <label className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 dark:bg-yellow-500 rounded-full"></div>
                            Статус
                        </label>
                        <div className="flex flex-col gap-y-3">
                            {(["pending", "approved", "rejected", "draft"] as Status[]).map((status) => (
                                <Checkbox
                                    key={status}
                                    checked={selectedStatuses.includes(status)}
                                    onChange={() => toggleStatus(status)}
                                >
                                    <span className="text-base text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white font-medium">{getStatusLabel(status)}</span>
                                </Checkbox>
                            ))}
                        </div>
                    </div>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-blue-100 dark:border-gray-600'>
                        <label className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 dark:bg-purple-500 rounded-full"></div>
                            Категория
                        </label>
                        <div className="flex flex-col gap-y-3">
                            {Object.keys(categoryMap).map((categoryId) => (
                                <Checkbox
                                    key={categoryId}
                                    checked={selectedCategories.includes(categoryId)}
                                    onChange={() => toggleCategories(categoryId)}
                                >
                                    <span className="text-base text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white font-medium">{categoryMap[Number(categoryId)]}</span>
                                </Checkbox>
                            ))}
                        </div>
                    </div>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-blue-100 dark:border-gray-600'>
                        <label className="text-sm font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"></div>
                            Диапазон цен
                        </label>
                        <div className="flex flex-col gap-y-3">
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder='От'
                                min='0'
                                max={maxPrice}
                                value={minPrice}
                                onChange={(e) =>
                                    setParams((prev) => ({ ...prev, min: String(e) }))
                                }
                            />
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder='До'
                                min={minPrice}
                                value={maxPrice}
                                onChange={(e) =>
                                    setParams((prev) => ({ ...prev, max: String(e) }))
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Найдено:</span> <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">67</span> <span className="text-gray-600 dark:text-gray-400">объявлений</span>
                    </div>

                </div>
                <div className="flex items-center gap-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <BarsOutlined />
                        Сортировка:
                    </label>
                    <Select
                        style={{ width: 220 }}
                        defaultValue={'sortBy=createdAt&sortOrder=acs'}
                        options={[
                            { value: 'sortBy=createdAt&sortOrder=acs', label: 'Сначала новые' },
                            { value: 'sortBy=createdAt&sortOrder=desc', label: 'Сначала старые' },
                            { value: 'sortBy=price&sortOrder=acs', label: 'Цена по убыванию' },
                            { value: 'sortBy=price&sortOrder=decs', label: 'Цена по возрастанию' },
                            { value: 'sortBy=priority&sortOrder=acs', label: 'По приоритету' },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filters
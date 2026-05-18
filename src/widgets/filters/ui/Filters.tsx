import { useState } from 'react'
import { Input, Button, Checkbox, InputNumber, Select, Radio } from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import { SearchOutlined, FilterOutlined, BarsOutlined, CloseOutlined } from '@ant-design/icons'
import { getStatusLabel, categoryMap, type Status } from "@entities/advertisement"
import { useAdvertisementsParams, type IAdvertisementsParams } from "@entities/advertisement"

type FiltersProps = {
    totalItems: number | undefined
}

const Filters = (props: FiltersProps) => {

    const { totalItems } = props

    const [params, setParams] = useAdvertisementsParams()
    const [showFilters, setShowFilters] = useState(false)

    const search = params.search
    const selectedStatuses = params.status
    const selectedCategory = params.categoryId
    const minPrice = params.minPrice
    const maxPrice = params.maxPrice
    const sortBy = params.sortBy
    const sortOrder = params.sortOrder

    const convertRecordToOptions = (record: Record<number, string>): CheckboxGroupProps<number>['options'] => {
        return Object.entries(record).map(([key, text]) => ({
            value: Number(key),
            label: (
                <span className="text-base text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white font-medium">
                    {text}
                </span>
            ),
        }))
    }

    type SortOption = Pick<IAdvertisementsParams, 'sortBy' | 'sortOrder'>

    const sortOptions: { value: string; label: string; sort: SortOption }[] = [
        { value: 'createdAt_asc',  label: 'Сначала новые',       sort: { sortBy: 'createdAt', sortOrder: 'asc' } },
        { value: 'createdAt_desc', label: 'Сначала старые',      sort: { sortBy: 'createdAt', sortOrder: 'desc' } },
        { value: 'price_desc',     label: 'Цена по убыванию',    sort: { sortBy: 'price',     sortOrder: 'desc' } },
        { value: 'price_asc',      label: 'Цена по возрастанию', sort: { sortBy: 'price',     sortOrder: 'asc' } },
        { value: 'priority_desc',   label: 'По приоритету',      sort: { sortBy: 'priority',  sortOrder: 'desc' } },
    ]

    const currentSortValue = `${sortBy}_${sortOrder}`

    const handleSort = (value: string) => {
        const option = sortOptions.find((o) => o.value === value)
        if (option) setParams(option.sort)
    }

    const resetFilters = () => {
        setParams({
            status: [],
            categoryId: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            page: 1
        })
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
                            setParams({ search: e.target.value })
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
                {(selectedStatuses.length > 0 || selectedCategory || minPrice || maxPrice) && (
                    <Button
                        icon={<CloseOutlined />}
                        color='danger'
                        size='large'
                        onClick={resetFilters}
                        variant='solid'
                    >
                        Сбросить
                    </Button>
                )}
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
                                    onChange={() =>
                                        setParams((prev) => ({
                                            page: 1,
                                            status: prev.status.includes(status)
                                                ? prev.status.filter((s) => s !== status)
                                                : [...prev.status, status],
                                        }))
                                    }
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
                            <Radio.Group
                                vertical
                                value={selectedCategory}
                                onChange={(e) =>
                                    setParams({ categoryId: e.target.value, page: 1 })
                                }
                                options={convertRecordToOptions(categoryMap)}

                            />
                        </div>
                    </div>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-blue-100 dark:border-gray-600'>
                        <label className="text-sm font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"></div>
                            Диапазон цен
                        </label>
                        <div className="flex flex-col gap-y-3">
                            <InputNumber
                                type='number'
                                style={{ width: '100%' }}
                                placeholder='От'
                                min={0}
                                max={maxPrice}
                                value={minPrice}
                                onChange={(e) =>
                                    setParams({ minPrice: e, page: 1 })
                                }
                            />
                            <InputNumber
                                type='number'
                                style={{ width: '100%' }}
                                placeholder='До'
                                min={minPrice}
                                value={maxPrice}
                                onChange={(e) =>
                                    setParams({ maxPrice: e, page: 1 })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Найдено:</span> <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{totalItems ? totalItems : '-'}</span> <span className="text-gray-600 dark:text-gray-400">объявлений</span>
                    </div>

                </div>
                <div className="flex items-center gap-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <BarsOutlined />
                        Сортировка:
                    </label>
                    <Select
                        style={{ width: 220 }}
                        value={currentSortValue}
                        options={sortOptions}
                        onChange={handleSort}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filters
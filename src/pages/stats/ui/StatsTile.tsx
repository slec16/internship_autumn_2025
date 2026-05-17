type StatsTileProps = {
    title: string
    value: number
    unit: string
    icon: any
    iconColor: string
}
const StatsTile = (props: StatsTileProps) => {

    const { title, value, unit, icon, iconColor } = props
    
    return (
        <div className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-y-2">
            <p className="text-gray-800 dark:text-gray-200 mb-2">{title}</p>
            <div className="flex items-center justify-between">
                <div>
                    {value ? (
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{unit === "%" ? value.toFixed(1) : value} {unit}</p>
                    ) : <p>-</p>}
                </div>
                <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default StatsTile
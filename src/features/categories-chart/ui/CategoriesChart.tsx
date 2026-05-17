import type { Period } from "@/entities/stats"
import {
    useCategoriesChart,
    convertTabValueToAPeriod
} from "@entities/stats"


const CategoriesChart = ({period}: {period: string}) => {

    return(
        <div className="w-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-y-2">
            <h3>По категориям</h3>
            <div>
                {/* chart */}
            </div>
        </div>
    )
}

export default CategoriesChart
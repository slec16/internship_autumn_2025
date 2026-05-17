import type { Period } from "@/entities/stats"
import {
    useDecisionsChart,
    convertTabValueToAPeriod
} from "@entities/stats"


const DecisionsChart = ({period}: {period: string}) => {

    return(
        <div className="w-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-y-2">
            <h3>Распределение решений</h3>
            <div>
                {/* chart */}
            </div>
        </div>
    )
}

export default DecisionsChart
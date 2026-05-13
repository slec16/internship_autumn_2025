import { useAdvertisements } from "@/entities/advertisement"
import Filters from "@/widgets/filters"
import { useQueryParams } from "@/shared/lib/useQueryParams"

const ListPage = () => {

    const [ params, _setParams]  = useQueryParams()


    const { data: Advertisement, isLoading, error } = useAdvertisements(params)

    console.log(Advertisement)
 
    return(
        <div>
            <Filters />
        </div>
    )
}

export default ListPage
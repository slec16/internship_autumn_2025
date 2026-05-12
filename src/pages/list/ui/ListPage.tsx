
import { useAdvertisements } from "@/entities/Advertisement"

const ListPage = () => {


    const { data: Advertisement, isLoading, error } = useAdvertisements()

    console.log(Advertisement)
 
    return(
        <div>
            ListPage
        </div>
    )
}

export default ListPage

import { useAdvertisements } from "@/entities/advertisement"

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
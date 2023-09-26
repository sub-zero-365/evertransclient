import { useLoaderData,Outlet,Link} from "react-router-dom"



const EditSingleTicket = () => {
    const id = useLoaderData()
    return (
        <div>EditSingleTicket
            ticket id : {id}
            {/* <Link
            ></Link> */}
            
            <Outlet/>
        </div>
    )
}

export default EditSingleTicket
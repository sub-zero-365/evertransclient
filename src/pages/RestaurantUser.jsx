import RestaurantUserStatsContainer from "../components/RestaurantUserStatsContainer";
import Reciept from "../components/Reciept"

const RestaurantUser = () => {
    return (
        <div>
            <RestaurantUserStatsContainer
                defaultStats={{}}
            />
            <div
                className="lg:px-24 px-8 gap-x-4 grid py-5 grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"

            >
                {
                    Array.from({ length: 10 }, (arr, idx) => <Reciept key={idx} />)
                }

            </div>

        </div>
    )
}

export default RestaurantUser
import { useSearchParams } from "react-router-dom"
export default function useGetdates(range) {
    const [querySearch] = useSearchParams()
    const decoded = decodeURIComponent(querySearch.get(range))
    const [startdate, enddate] = decoded.
        split(",").
        map(arr => arr.split("="))
        .map(([v, t]) => {
            return {
                [v]: t
            }
        });
    return ({
        startdate: startdate?.start?new Date(startdate?.start):new Date(),
        enddate: enddate?.end ? new Date(enddate.end) : null
    })
}
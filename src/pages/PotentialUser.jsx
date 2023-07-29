import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
const PotentialUser = () => {
    return (
        <div>
            <div>protected</div>
            <Outlet />
        </div>
    )
}

export default PotentialUser
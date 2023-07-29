
import { Outlet } from 'react-router-dom'
const Assist = () => {
    return (
        <div className="h-[calc(100%-60px)">
            <div>
                <div className="tops">
                    readady to scan tickets now
                </div>
                <Outlet />
            </div>
        </div>)
}
export default Assist
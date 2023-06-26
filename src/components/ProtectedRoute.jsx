import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token")
    if (!token) {
        return <Navigate to="/login?message=hello user please login to access this protected route" replace/>
    }
    return (
        <Outlet />
    )
}
export default ProtectedRoute
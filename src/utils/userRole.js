import { useUserLayoutContext } from '../components/UserLayout';
import { USER_ROLES } from './roles';
export default function UserRole(user = null) {
    const { user: currentLoginUser } = useUserLayoutContext() ?? { user: null }
    const currentUser = user === null ? currentLoginUser : user;
    let userRole = "/login"
    // alert(currentUser?.role)
    if (currentUser?.role === USER_ROLES.ticketer) userRole = "/user"
    else if (currentUser?.role === USER_ROLES.mailer) userRole = "/user/mails"
    else if (currentUser?.role === USER_ROLES.restaurant_user) userRole = "/restaurant"
    else if (currentUser?.role === USER_ROLES.scanner) userRole = "/assistant"
    else if (currentUser?.role === USER_ROLES.admin || currentUser?.role === USER_ROLES.sub_admin) userRole = "/dashboard"
    else userRole = "/login?message=please login to continue "
    return userRole
}

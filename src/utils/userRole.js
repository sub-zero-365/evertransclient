import { useUserLayoutContext } from '../components/UserLayout';
export default function UserRole(user=null){
    const { user:currentLoginUser } = useUserLayoutContext()
    const currentUser=user==null?currentLoginUser:user;
    let userRole = "/login"
    if (currentUser?.role == "tickets") userRole = "/user"
    else if (currentUser?.role == "mails") userRole = "/user/mails"
    else if (currentUser?.role == "restaurants") userRole = "/restaurant"
    else userRole = "/login?message=please login to continue "
    return userRole
}

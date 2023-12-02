export default function userRole(user){
    let userRole = "/login"
    if (user?.role == "tickets") userRole = "/user"
    else if (user?.role == "mails") userRole = "/user/mails"
    else if (user?.role == "restaurants") userRole = "/restaurant"
    else userRole = "/login?message=please login to continue "
    return userRole
}
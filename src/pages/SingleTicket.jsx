import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
const User = () => {
  const [queryParameters] = useSearchParams()
  const [isAdmin, setAdmin] = useState(false)
  useEffect(() => {
    setAdmin(queryParameters.get("admin"));
  }, [window.location.href])

  return (
    <div>single ticket here {isAdmin && ("user is admin here")} {!isAdmin && ("user is not admin here")} </div>
  )
}

export default User
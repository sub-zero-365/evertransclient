import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser as setLoginUser } from "../actions/userSlice.js";
import customFetch from "../utils/customFetch.js";
import { isAxiosError } from "axios";
import { useUserLayoutContext } from "../components/UserLayout.jsx";

export default function useAuthenticalUser() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setUser } = useUserLayoutContext()
    const loginUser = async () => {
        try {
            const { data } = await customFetch.get("/users/current-user");
            const { user } = data;
            setUser(user)
        } catch (err) {
            //do nothing here
        }
    };
    const logOut = async (error = "") => {
        try {
            await customFetch.get("/auth/logout");
            navigate("/login?message=" + error);
            dispatch(removeUser());
            await queryClient.removeQueries();
        } catch (err) {
            if (isAxiosError(err)) {
                alert("fail to logout")
            }
            // alert("fail to logout !!!");
            // console.log("this is the fail response here", err.response?.data);
        }
    };
    return {
        loginUser,
        logOut,
    };
}

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import ToggleSwitch from './ToggleSwitch'
import customFetch from '../utils/customFetch'
const RestrictUser = ({ id }) => {
    const [isUserBlock,
        setIsUserBlock] = useState(true
        )
    
    const { refetch, isLoading } = useQuery({
        // queries: [
        // {
        queryKey: ["current-user-status", id], queryFn: async () => {
            try {
                await customFetch.get("/restricted/" + id);
                // console.log(data)
                setIsUserBlock(true)

            } catch (err) {
                setIsUserBlock(false)
                console.log("this is the error here", err)

            }
        },

    })
    const { refetch: AddRestrictedUser, isFetching: addFetching } = useQuery({
        // queries: [
        // {
        queryKey: ["addrestricteduser", id], queryFn: async () => {
            try {
                await customFetch.post("/restricted", {
                    user_id: id
                });

            } catch (err) {
                // setIsUserBlock(false)
                console.log("this is the error here", err)

            } finally {
                refetch()
            }
        },
        // staleTime: Infinity,
        enabled: false
        // }
        // ]
    })
    const { refetch: removeRestrictedUser, isFetching: rmFetching } = useQuery({
        // queries: [
        // {
        queryKey: ["rmrestricteduser", id], queryFn: async () => {
            try {
                await customFetch.delete("/restricted/" + id, {});
                // console.log(data)
                // setIsUserBlock(true)

            } catch (err) {
                // setIsUserBlock(false)/
                console.log("this is the error here", err)

            }
            finally {
                refetch()
            }
        },
        enabled: false
        // staleTime: Infinity
        // }
        // ]
    })
    return (
        <div>
            <ToggleSwitch
                onChange={() => {
                    if (isUserBlock) {
                        removeRestrictedUser()
                        // refetch()
                    } else {
                        AddRestrictedUser()
                    }

                }}
                message={"User is block from printing tickets"}
                initialMessage={"user is block from priinting tickets"}
                state={isUserBlock}
                disabled={(addFetching || rmFetching)}
            />

        </div>
    )
}

export default RestrictUser
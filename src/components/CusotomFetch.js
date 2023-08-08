
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useCustomFetch = (url, {
    qFn, loadOnRender
}) => {
    const loadrender = useRef({ loadOnRender })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [value, setValue] = useState(null)
    const refetch = () => {
        setValue(Math.random())
        loadrender.current = true
    }
    // code here 
    useEffect(() => {
        if (loadrender.current == false) return
        qFn().then(({ data }) => {
            setData(data)
        }).catch(err => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })


    }, [value])
    return {
        loading, data, error, refetch
    }

}
export default useCustomFetch
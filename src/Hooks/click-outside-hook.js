import {useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setToggle(true)
            } else {
                setToggle(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return {
        toggle,
    }
}

export default useOutsideAlerter
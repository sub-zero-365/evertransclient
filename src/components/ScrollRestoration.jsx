import { ScrollRestoration as ScrollRes } from "react-router-dom"

const ScrollRestoration = ({ children }) => {
    return (
        <ScrollRes
            getKey={(location, matches) => { return location.pathname }}
        >
            {children}
        </ScrollRes>
    )
}

export default ScrollRestoration
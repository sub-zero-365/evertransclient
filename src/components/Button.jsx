import { useNavigate, Link } from 'react-router-dom'
import UiButton from './UiButton';
const
    Button = ({ className, href, name, state,children }) => {
        const navigate = useNavigate();
        const navigateTo = (path = "/") => {
            return navigate(path)
        }
        return (
            <Link to={href}
                state={state}

                style={{
                    whiteSpace: "nowrap"
                }}
            >
                <UiButton
                    className={"!bg-green-800"}
                    name={name || "Details"}
                />

            </Link>
        )
    }

export default Button
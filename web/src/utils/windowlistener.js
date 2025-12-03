import { useEffect } from "react"
import useStore from "../state/store"


const WindowListener = ({children}) => {
    const { setState } = useStore()

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key == 'Escape') {
                setState({ type: 'hideUI' })
            }
        })
    }, []);

    useEffect(() => {
        window.addEventListener('message', (event) => {
            const { data } = event.data;
            const type = event.data.type
            setState({ type: type, data: data })
        })
    }, [])
    return children;
}


export default WindowListener;
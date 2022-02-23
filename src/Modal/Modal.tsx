import Portal from "./Portal";
import {GlobalStyle} from "../styles/GlobalStyle";
import {Button} from "../components/Button";


export const Modal = ({open, onClose}: { open: boolean, onClose: () => void }) => {

    return (
        open ? <Portal>
            <GlobalStyle/>

            <div className=" full ">
                <Button onClick={onClose}>Close</Button>
                <div className="flex ds-500 relative center">
                    <h1>My Modal </h1>
                </div>

            </div>
        </Portal> : null
    )
}
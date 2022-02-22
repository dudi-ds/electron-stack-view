import Portal from "./Portal";
import {GlobalStyle} from "../styles/GlobalStyle";


export const Modal = ({open}: { open: boolean }) => {

    return (
        open ? <Portal>
            <GlobalStyle/>
            <div className=" full ">
                <div className="flex ds-500 relative center">
                    <h1>My Modal </h1>
                </div>
            </div>
        </Portal> : null
    )
}
// ReactDOM.render(<Modal/>, document.getElementById("root"));
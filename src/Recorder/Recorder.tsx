import ReactDOM from "react-dom";
import {Button} from "../components/Button";
import Modal from "../Modal";
import {useState} from "react";


export function Recorder() {
    const [open, setOpen] = useState(false)
    const handleShowLoaded = () => {
        window.Main.send('load-loader', {data: null})
    }
    return (
        <>
            <div id="root">
                <div style={{display: "flex"}}>
                    <div>
                        <h1>Recorder</h1>
                    </div>
                    <div>
                        <Button onClick={handleShowLoaded}>Go To Loader</Button>
                    </div>
                </div>


            </div>
            <Button onClick={async () => {
                await window.Main.send('open-modal', {});
                setOpen(true)
            }}>open modal</Button>
            <Modal open={open}  onClose={
                () => {
                    window.Main.send('close-modal', {})
                    setOpen(false)
                }
            } />
        </>
    )
}

ReactDOM.render(<Recorder/>, document.getElementById("root"));

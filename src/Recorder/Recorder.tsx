import ReactDOM from "react-dom";
import {Button} from "../components/Button";


export function Recorder() {
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
        </>
    )
}

ReactDOM.render(<Recorder/>, document.getElementById("root"));

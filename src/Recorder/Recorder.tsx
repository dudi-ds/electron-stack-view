import ReactDOM from "react-dom";

export function Recorder() {
    return (
        <>
            <div id="root">
                <h1>Recorder</h1>
            </div>
        </>
    )
}

ReactDOM.render(<Recorder/>, document.getElementById("root"));

import ReactDOM from "react-dom";
import {Button} from "../components/Button";

export function Loader() {

  return (
    <div id="root" style={{backgroundColor: '#b9b9b9', height: '100vh'}}>
        <h1>Loader</h1>
        <Button onClick={() => window.Main.send('load-recorder', {data: null})}>Load</Button>
    </div>
  )
}

ReactDOM.render(<Loader />, document.getElementById("root"));
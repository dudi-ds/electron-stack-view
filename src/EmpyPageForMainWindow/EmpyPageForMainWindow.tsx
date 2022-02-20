import ReactDOM from "react-dom";
// import {Button} from "../components/Button";

export function EmpyPageForMainWindow() {

  return (
    <div id="root" style={{ height: '100vh'}}>

        {/* <Button onClick={() => window.Main.send('load-recorder', {data: null})}>Load</Button> */}
    </div>
  )
}

ReactDOM.render(<EmpyPageForMainWindow />, document.getElementById("root"));
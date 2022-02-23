import ReactDOM from "react-dom";
// import {Button} from "../components/Button";

export function EmptyPageForMainWindow() {
console.log('1111')
  return (
    <div id="root" >

        {/* <Button onClick={() => window.Main.send('load-recorder', {data: null})}>Load</Button> */}
    </div>
  )
}

ReactDOM.render(<EmptyPageForMainWindow />, document.getElementById("root"));
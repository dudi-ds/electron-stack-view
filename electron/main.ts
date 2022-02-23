import {app, BrowserWindow} from 'electron'
import {WindowManager} from "./window-manager";
import path from "path";
import {electronAppName, rendererAppName} from '../constants';
import {Router} from "./router";
// import {join} from "path";

let window: WindowManager;
let router: Router;

const isPackaged = false;



export const resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(
        __dirname.replace(electronAppName, rendererAppName),
        htmlFileName
    )}`
}


app.on('ready', () => {
    window = new WindowManager();
    window.createWindow()
    })
    .whenReady()
    .then(() => {
         router = new Router(window);
         router.registerListeners(isPackaged)
    })
    .catch(e => console.error(e))

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        window = new WindowManager();
        window.createWindow()
    }
})

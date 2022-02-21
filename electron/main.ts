import {app, BrowserWindow, ipcMain} from 'electron'
import {WindowManager} from "./window-manager";
import path from "path";
import {electronAppName, rendererAppName} from '../constants';
// import {join} from "path";

let window: WindowManager;


const isPackaged = false;



async function registerListeners() {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log('message', message)
    })

    ipcMain.on('webview-size', (_, message) => {
        console.log('AAA', message)
        const oldBound = window.mainWindow.getBounds();
        window.appView.setBounds({...oldBound, y: 0, width: message, height: 100})
        window.recorderView.setBounds({...oldBound, y: 80, width: message})
    })

    ipcMain.on('load-recorder', async (_, message) => {
        const mainBound = window.mainWindow.getBounds();
        window.mainWindow.setTopBrowserView(window.appView)

        if (isPackaged) {
            window.mainWindow.webContents.loadURL(resolveHtmlPath(`empty/index.html`))
            window.appView.webContents.loadURL(resolveHtmlPath(`recorder/index.html`))
        } else {
            window.mainWindow.webContents.loadURL('http://localhost:3000/empty')
            window.appView.webContents.loadURL('http://localhost:3000/recorder');
        }

        window.recorderView.webContents.loadURL('http://github.com/')

        window.appView.setBounds({x: 0, y: 0, width: mainBound.width, height: 100})
        window.appView.setAutoResize({width: true, height: true})
        window.recorderView.setBounds({x: 0, y: 80, width: mainBound.width, height: mainBound.height - 100})
        window.recorderView.setAutoResize({width: true, height: true})
        window.recorderView.webContents.openDevTools({mode: 'detach'})
    })

    ipcMain.on('load-loader', async (_, message) => {
        console.log('load-loader')
        const mainBound = window.mainWindow.getBounds();
        if (isPackaged) {
            window.mainWindow.webContents.loadURL(resolveHtmlPath('empty/index.html'))
            window.appView.webContents.loadURL(resolveHtmlPath('recorder/index.html'))
            window.appView.webContents.loadURL(resolveHtmlPath('main_window/index.html'))
        } else {
            window.recorderView.webContents.loadURL('http://localhost:3000/empty')
            window.mainWindow.webContents.loadURL('http://localhost:3000/empty')
            window.appView.webContents.loadURL('http://localhost:3000/main_window');
        }

        window.appView.setBounds({...mainBound, y: 0, x: 0})
        window.recorderView.setBounds({x: 0, y: 0, width: 0, height: 0})
    })


}


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
    .then(registerListeners)
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

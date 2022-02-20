import {app, BrowserView, BrowserWindow, ipcMain, screen} from 'electron'
// import {join} from "path";

let mainWindow: BrowserWindow
let appView: BrowserView
let recorderView: BrowserView

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string


const workAreaSize = () => {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize
    const width = Math.min(1280, workAreaSize.width || 1280)
    const height = Math.min(720, workAreaSize.height || 720)
    return {width, height}
}

function createWindow() {
    const {width, height} = workAreaSize();
    mainWindow = new BrowserWindow({
        // icon: path.join(assetsPath, 'assets', 'icon.png'),
        width,
        height,
        resizable: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    })

    mainWindow.webContents.openDevTools({mode: "detach"})
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    createWebViews();
}

function createWebView() {
    const view = new BrowserView({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,

            enablePreferredSizeMode: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    })
    view.setBounds({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    })
    return view;
}

function createWebViews() {
    appView = createWebView();
    recorderView = createWebView();
    mainWindow?.addBrowserView(appView)
    mainWindow?.addBrowserView(recorderView)
}


async function registerListeners() {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log('message', message)
    })

    ipcMain.on('webview-size', (_, message) => {
        console.log('AAA', message)
        const oldBound = mainWindow.getBounds();
        appView.setBounds({...oldBound, y: 0, width: message, height: 80})
        recorderView.setBounds({...oldBound, y: 80, width: message})
    })

    ipcMain.on('load-recorder', async (_, message) => {
        const mainBound = mainWindow.getBounds();
        mainWindow.setTopBrowserView(appView)

        // Clean main Loader //
        mainWindow.webContents.loadURL('http://localhost:3000/empty')

        // Set position and load route //
        appView.setBounds({x: 0, y: 0, width: mainBound.width, height: 80})
        appView.webContents.loadURL('http://localhost:3000/recorder');
        appView.setAutoResize({width: true, height: true})


        // Set position and load Recorder view (WebView)  //
        recorderView.setBounds({x: 0, y: 80, width: mainBound.width, height: mainBound.height - 100})
        recorderView.webContents.loadURL('http://github.com/')
        recorderView.setAutoResize({width: true, height: true})
        recorderView.webContents.openDevTools({mode: 'detach'})

    })


}


app.on('ready', createWindow)
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
        createWindow()

    }
})

import { BrowserView, BrowserWindow, screen} from 'electron'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

export class WindowManager {
    // @ts-ignore
    public mainWindow: BrowserWindow
    // @ts-ignore
    public appView: BrowserView
    // @ts-ignore
    public recorderView: BrowserView



    createWindow() {
        const {width, height} = workAreaSize();
        this.mainWindow = new BrowserWindow({
            width,
            height,
            resizable: true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
            }
        })

        this.mainWindow.webContents.openDevTools({mode: "detach"})
        this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)


        this.mainWindow.on('closed', () => {
            // @ts-ignore
            this.mainWindow = null
        })
        this.createWebViews()
        this.mainWindow.setMenu(null)
    }

    createWebView() {
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


    createWebViews() {
        this.appView = this.createWebView();
        this.recorderView = this.createWebView();
        this.mainWindow?.addBrowserView(this.appView)
        this.mainWindow?.addBrowserView(this.recorderView)
    }
}


const workAreaSize = () => {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize
    const width = Math.min(1280, workAreaSize.width || 1280)
    const height = Math.min(720, workAreaSize.height || 720)
    return {width, height}
}


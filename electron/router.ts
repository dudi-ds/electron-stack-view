import {ipcMain} from "electron";
import {resolveHtmlPath} from "./main";
import {WindowManager} from "./window-manager";

export class Router {
    appViewInitBound: any;
    // eslint-disable-next-line no-useless-constructor
    constructor(private window: WindowManager) {}

    registerListeners(isPackaged: boolean) {
        // this.window = new WindowManager();
        /**
         * This comes from bridge integration, check bridge.ts
         */
        ipcMain.on('message', (_, message) => {
            console.log('message', message)
        })


        ipcMain.on('load-recorder', async (_, message) => {
            const mainBound = this.window.mainWindow.getBounds();
            this.window.mainWindow.setTopBrowserView( this.window.appView)

            if (isPackaged) {
                this.window.mainWindow.webContents.loadURL(resolveHtmlPath(`empty/index.html`))
                this.window.appView.webContents.loadURL(resolveHtmlPath(`recorder/index.html`))
            } else {
                this.window.appView.webContents.loadURL('http://localhost:3000/recorder');
                this.window.mainWindow.webContents.loadURL('http://localhost:3000/empty')

            }

            this.window.recorderView.webContents.loadURL('http://github.com/')


            this.window.recorderView.setBounds({x: 0, y: 100, width: mainBound.width, height: mainBound.height - 100})
            this.window.recorderView.setAutoResize({width: true, height: true})
            this.window.appView.webContents.openDevTools({mode: 'detach'})

            this.window.appView.setBounds({x: 0, y: 0, width: mainBound.width, height: 300})
            this.window.appView.setAutoResize({width: true, height: true})

            this.appViewInitBound =  this.window.appView.getBounds();

        })


        ipcMain.on('open-modal', ( _, message) => {
            const mainBound = this.window.mainWindow.getBounds();
            this.appViewInitBound =  this.window.appView.getBounds();
            this.window.appView.setBounds({x: 0, y: 0, width: mainBound.width, height: mainBound.height})
        })

        ipcMain.on('close-modal', ( _, message) => {
            const mainBound = this.window.mainWindow.getBounds();
            this.window.appView.setBounds({x: 0, y: 0, width: mainBound.width, height: this.appViewInitBound.height})
        })


        ipcMain.on('load-loader', async (_, message) => {
            console.log('load-loader')
            const mainBound =  this.window.mainWindow.getBounds();
            if (isPackaged) {
                this.window.mainWindow.webContents.loadURL(resolveHtmlPath('empty/index.html'))
                this.window.appView.webContents.loadURL(resolveHtmlPath('recorder/index.html'))
                this.window.appView.webContents.loadURL(resolveHtmlPath('main_window/index.html'))
            } else {
                this.window.recorderView.webContents.loadURL('http://localhost:3000/empty')
                this.window.mainWindow.webContents.loadURL('http://localhost:3000/empty')
                this.window.appView.webContents.loadURL('http://localhost:3000/main_window');
            }

            this.window.appView.setBounds({...mainBound, y: 0, x: 0})
            this.window.recorderView.setBounds({x: 0, y: 0, width: 0, height: 0})

            this.appViewInitBound =  this.window.appView.getBounds();
        })


    }
}
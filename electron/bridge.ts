import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  send: (channel: string, args: any | any[]) => {
    ipcRenderer.send(channel, args)
  },

  updateBounds: () => {
    ipcRenderer.send(
        'webview-size',
        document.body.offsetWidth || document.body.scrollWidth,
        document.body.offsetHeight || document.body.scrollHeight,
    );
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)

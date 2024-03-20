import { BrowserWindow } from 'electron'

export const eventMap = {
  handleSetTitle: (event: Electron.IpcMainEvent, title: string): void => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    if (win) {
      win.setTitle(title)
    }
  }
}

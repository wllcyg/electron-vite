import { BrowserWindow, dialog } from 'electron'

// @ts-ignore
export const eventMap = {
  handleSetTitle: (event: Electron.IpcMainEvent, title: string): void => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    if (win) {
      win.setTitle(title)
    }
  },
  handleFileOpen:async () => {
    console.log('this is file open')
    const { canceled,filePaths } = await dialog.showOpenDialog({})
    if (!canceled){
      return filePaths[0]
    }
    return null
  }
}

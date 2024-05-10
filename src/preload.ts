import { contextBridge, ipcRenderer } from 'electron'
type versionFun = (...args: unknown[]) => void
export interface versionInt {
  [key: string]: versionFun
}
const db: versionInt = {
  saveValue: (value) => ipcRenderer.invoke('saveValue', value),
  findValue: (value) => ipcRenderer.invoke('findValue', value),
  findOne: (value) => ipcRenderer.invoke('findOne', value),
  updateValue: (value) => ipcRenderer.invoke('updateValue', value),
  deleteItem: (value) => ipcRenderer.invoke('deleteItem', value),
}
const system: versionInt = {
  openBrowser: (value) => ipcRenderer.sendSync('openBrowser', value),
  showChild: (value) => ipcRenderer.send('showChild', value),
}
const OSS: versionInt = {
  clientOss: (value) => ipcRenderer.invoke('Client-OSS', value),
  checkOssStatus: () => ipcRenderer.invoke('Check-OSS-Status'),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('db', db)
    contextBridge.exposeInMainWorld('system', system)
    contextBridge.exposeInMainWorld('OSS', OSS)

  } catch (error) {
    console.error(error)
  }
}

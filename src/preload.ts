// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
type versionFun = (...args: unknown[]) => void
export interface versionInt {
  [key: string]: versionFun
}
const db: versionInt = {
  saveValue:(value) => ipcRenderer.invoke('saveValue',value),
  findValue:(value) => ipcRenderer.invoke('findValue',value),
  findOne:(value) => ipcRenderer.invoke('findOne',value),
  updateValue:(value) => ipcRenderer.invoke('updateValue',value),
  deleteItem:(value) => ipcRenderer.invoke('deleteItem',value),
}
const system: versionInt = {
  openBrowser:(value) => ipcRenderer.sendSync('openBrowser',value),
}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('db', db)
    contextBridge.exposeInMainWorld('system', system)


  } catch (error) {
    console.error(error)
  }
}

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
type versionFun = (...args: unknown[]) => void
export interface versionInt {
  [key: string]: versionFun
}
const db: versionInt = {
  saveValue:(value) => ipcRenderer.invoke('saveValue',value),
}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('db', db)
  } catch (error) {
    console.error(error)
  }
}
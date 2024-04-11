import { contextBridge, ipcRenderer } from 'electron'
type versionFun = (...args: unknown[]) => void
export interface versionInt {
  [key: string]: versionFun
}
const db: versionInt = {
  saveValue:(value) => ipcRenderer.invoke('save-value',value),
}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('db', db)
  } catch (error) {
    console.error(error)
  }
}

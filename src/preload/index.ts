import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
type versionFun = () => void
export interface versionInt {
  [key: string] : versionFun
}
// Custom APIs for renderer
const api = {}
const version:versionInt = {
  'node': () => process.versions.node,
  'chrome': () => process.versions.chrome,
  'electron': () => process.versions.electron,
  'ping': () => ipcRenderer.invoke('ping')
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('version', version)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

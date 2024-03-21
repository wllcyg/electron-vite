import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
type versionFun = (...args: string[]) => void
export interface versionInt {
  [key: string]: versionFun
}
// Custom APIs for renderer
const api = {

}
const version: versionInt = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
  openFile:() => ipcRenderer.invoke('dialog-open'),
}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('version', version)
    // 暴露给主线程的api,向渲染线程展示
    contextBridge.exposeInMainWorld('electronAPI', {
      // eslint-disable-next-line @typescript-eslint/ban-types
      onUpdateCounter: (callback:Function) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

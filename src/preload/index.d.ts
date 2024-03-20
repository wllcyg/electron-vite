import { ElectronAPI } from '@electron-toolkit/preload'
import { versionInt } from './index'
declare global {
  // 定义windows下的变量扩展
  interface Window {
    electron: ElectronAPI
    api: unknown,
    version: versionInt
  }
}

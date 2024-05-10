import { ipcMain } from 'electron'

import OssSingleton from '..';

export default function OSS() {
  ipcMain.handle('Client-OSS', (_, value) => {
    if (value) {
      OssSingleton.getInstance().initClient(value)
    }
    return ''
  })
  ipcMain.handle('Check-OSS-Status', async (_, value) => {
    return await OssSingleton.getInstance().listBuckets()
  })
}

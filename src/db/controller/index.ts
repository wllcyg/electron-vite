import { ipcMain } from 'electron'
import dbConfig from '../server';
export default function controller (){
  ipcMain.handle('saveValue', (_, value) => {
    return dbConfig.save(value)
  })
  ipcMain.handle('findValue', (_, value) => {
    return dbConfig.findValue(value)
  })
  ipcMain.handle('findOne', (_, value) => {
    return dbConfig.findOne(value)
  })
}